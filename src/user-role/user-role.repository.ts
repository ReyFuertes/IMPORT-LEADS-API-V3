import { sqlOp } from './../models/generic.model';
import { Repository, EntityRepository } from 'typeorm';
import * as _ from 'lodash';
import { NotFoundException } from '@nestjs/common';
import { UserRole } from './user-role.entity';
import { IUserRoleDto } from './user-role.dto';

@EntityRepository(UserRole)
export class UserRoleRepository extends Repository<UserRole> {
  async getById(id: string): Promise<number[]> {
    const query = this.createQueryBuilder('user_role');
    let results = await query
      .leftJoinAndSelect("user_role.user", "user.user_role")
      .leftJoinAndSelect("user_role.role", "role.user_role")
      .where("user_id = :user_id", { user_id: id })
      .getMany();

    results.forEach((result: any) => {
      delete result.user.password;
      delete result.user.salt;
      delete result.user.username
    });
    const ret = results.map(r => r.role.level);
    return ret;
  }

  async saveUserRole(dto: any): Promise<IUserRoleDto> {
    let ret: IUserRoleDto;
  
    const criteria = { role: { id: dto.role.id }, user: { id: dto.user.id } }

    const match = await this.findOne(criteria);
    if (match) {
      await this.delete(criteria);
    } else {
      ret = await this.save(criteria);
    }

    return ret;
  }
}

