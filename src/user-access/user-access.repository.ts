import { sqlOp } from './../models/generic.model';
import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import * as _ from 'lodash';
import { UserAccess } from './user-access.entity';
import { IUserAccessDto } from './user-access.dto';

@EntityRepository(UserAccess)
export class UserAccessRepository extends Repository<UserAccess> {

  async getById(id: string): Promise<string[]> {
    const query = this.createQueryBuilder('user_access');
    let results = await query
      .leftJoinAndSelect("user_access.user", "user.user_access")
      .leftJoinAndSelect("user_access.access", "access.user_access")
      .where("user_id = :user_id", { user_id: id })
      .getMany();

    results.forEach((result: any) => {
      delete result.user.password;
      delete result.user.salt;
      delete result.user.username
    });
    const ret = results.map(r => r.access.access_name);

    return ret;
  }

  async saveUserAccess(dto: IUserAccessDto): Promise<IUserAccessDto[]> {
    let ret: IUserAccessDto;
    const criteria = {
      user: { id: dto.user.id },
      access: { id: dto.access.id }
    }

    const match = await this.findOne(criteria);

    if (match) {
      await this.delete(criteria);
    } else {
      ret = await this.save(dto);
    }

    const query = this.createQueryBuilder('user_access');
    const results: IUserAccessDto[] = await query
      .leftJoinAndSelect('user_access.access', 'access.user_access')
      .where("user_id = :user_id", { user_id: dto.user.id })
      .getMany();
    
    const userDto = results.map(r => {
      return {
        ...r,
        user: { id: dto.user.id }
      }
    })
  
    return userDto;
  }
}

