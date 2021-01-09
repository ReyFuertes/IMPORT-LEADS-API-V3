import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import * as _ from 'lodash';
import { sqlOp } from 'src/models/generic.model';
import { IUserDto } from './user.dto';
import { User } from './user.entity';
import { IAccessDto } from 'src/access/access.dto';
import { IUserAccessDto } from 'src/user-access/user-access.dto';
import { UserAccessRepository } from 'src/user-access/user-access.repository';
import { UserRoleRepository } from 'src/user-role/user-role.repository';
import { IRoleDto } from 'src/role/role.dto';
import { IUserRoleDto } from 'src/user-role/user-role.dto';
import { AuthRepository } from 'src/auth/auth-repository';
import { UserProfileRepository } from 'src/user-profile/user-profile.repository';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getById(id: string): Promise<IUserDto> {
    const query = this.createQueryBuilder('user');
    const result = await query
      .leftJoinAndSelect("user.user_profile", "user_profile.user")
      .leftJoinAndSelect("user.user_access", "user_access.user")
      .leftJoinAndSelect("user.user_role", "user_role.user")
      .where("user.id = :id", { id })
      .getOne();

    /* get all user roles/access */
    const userRoles: any[] = await this.getUserRoles();
    const userAccess: any[] = await this.getUserAccess();

    delete result.salt;
    delete result.password;

    result.user_role = userRoles.filter(r => result.user_role.filter(ur => ur.id == r.id).shift());
    result.user_access = userAccess.filter(r => result.user_access.filter(ua => ua.id == r.id).shift());

    return result;
  }

  async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  async updateUser(dto: IUserDto): Promise<void> {
    const user = await this.findOne({ id: dto.id });

    /* user info */
    const salt = await bcrypt.genSalt();
    const payload = {
      id: dto.id,
      username: dto.username,
      salt,
      password: await this.hashPassword(dto.password, salt)
    }
    await this.save(payload);

    /* user access */
    let userAccessPayload: IUserAccessDto[] = [];
    dto.user_access && dto.user_access.forEach(async access => {
      userAccessPayload.push({ user: { id: user.id }, access })
    });
    const userAccessRepo = getCustomRepository(UserAccessRepository);
    await userAccessRepo.save(userAccessPayload);

    /* user roles */
    let userRolePayload: IUserRoleDto[] = [];
    dto?.user_role?.forEach(async user_role => {
      userRolePayload.push({ user: { id: user.id }, role: user_role, })
    });
    const userRoleRepo = getCustomRepository(UserRoleRepository);
    await userRoleRepo.save(userRolePayload);

    /* update auto created user profile */
    const userProfileRepo = getCustomRepository(UserProfileRepository);
    const profile = await userProfileRepo.findOne({ user: user });
    await userProfileRepo.save({
      ...profile,
      ...dto.user_profile
    });
  }

  async deleteUser(id: string): Promise<IUserDto> {
    const exist = await this.findOne({ id });
    if (exist) {
      this.createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id })
        .execute();

      delete exist.password;
      delete exist.username;
      delete exist.salt;

      return exist;
    }
    return null;
  }

  async createUser(dto: IUserDto): Promise<IUserDto[]> {
    /* user authentication */
    const user = await this.findOne({ username: dto.username });
    
    /* user access */
    let userAccessPayload = dto?.user_access?.map(access => {
      return {
        user: { id: user.id },
        access
      }
    });

    const userAccessRepo = getCustomRepository(UserAccessRepository);
    const userAccess = await userAccessRepo.save(userAccessPayload);

    /* user roles */
    let userRolePayload = dto?.user_role?.map(role => {
      return {
        user: { id: user.id },
        role
      }
    });
    const userRoleRepo = getCustomRepository(UserRoleRepository);
    const userRoles = await userRoleRepo.save(userRolePayload);

    /* update auto created user profile */
    const userProfileRepo = getCustomRepository(UserProfileRepository);
    const profile = await userProfileRepo.findOne({ user: user });
    const userProfile = await userProfileRepo.save({
      ...profile,
      ...dto.user_profile
    });

    const results = await this.getAllUsers({});
    await Promise.all([userAccess, userRoles, userProfile, results]);
    return results;
  }

  async getAllUsers(dto: any): Promise<IUserDto[]> {
    /* get all user roles/access */
    const userRoles: any[] = await this.getUserRoles();
    const userAccess: any[] = await this.getUserAccess();

    const query = this.createQueryBuilder('user');
    _.mapValues(dto, _.method('toLowerCase')); // convert values to lowercases
    const where = dto;
    const page = Object.assign({}, {
      take: dto.take,
      skip: dto.skip
    });
    delete where.skip, where.take;

    if (where && Object.keys(where)) {
      Object.entries(where).forEach(c => {
        //transform entries into object
        const obj = Object.assign({}, Object.entries(c)
          .reduce((acc, [k, v]) => ({ ...acc, [c[0]]: v }), {})
        );
        //note: im just using orWhere so every criteria will match the database
        let op: sqlOp = sqlOp.iLike;
        if (+(Object.values(obj)[0])) op = sqlOp.eq;

        query.orWhere(`${Object.keys(obj)} ${op} :${Object.keys(obj)}`, obj)
      });
    }
    const users: IUserDto[] = await query
      .skip(page.skip).take(page.take)
      .leftJoinAndSelect('user.user_profile', 'user_profile.user')
      .leftJoinAndSelect('user.user_access', 'user_access.user')
      .leftJoinAndSelect('user.user_role', 'user_role.user')
      .getMany();

    users.forEach((user: IUserDto) => {
      delete user.password;
      delete user.salt

      user.user_role = userRoles.filter(r => user.user_role.filter(ur => ur.id == r.id).shift());
      user.user_access = userAccess.filter(r => user.user_access.filter(ua => ua.id == r.id).shift());
    });

    return users;
  }

  async getUserRoles(): Promise<IRoleDto[]> {
    const repo = getCustomRepository(UserRoleRepository);
    const query = repo.createQueryBuilder('user_role');
    const results: IUserRoleDto[] = await query
      .leftJoinAndSelect('user_role.role', 'role.user_role')
      .getMany();

    return results;
  }

  async getUserAccess(): Promise<IAccessDto[]> {
    const repo = getCustomRepository(UserAccessRepository);
    const query = repo.createQueryBuilder('user_access');
    const results: IUserAccessDto[] = await query
      .leftJoinAndSelect('user_access.access', 'access.user_access')
      .getMany();

    return results;
  }
}


