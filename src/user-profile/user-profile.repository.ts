import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import * as _ from 'lodash';
import { UserProfile } from './user-profile.entity';
import { NotFoundException } from '@nestjs/common';
import { IUserProfileDto } from './user-profile.dto';

@EntityRepository(UserProfile)
export class UserProfileRepository extends Repository<UserProfile> {

  async updateProfile(dto: IUserProfileDto): Promise<IUserProfileDto> {
    const exist = this.findOne({ id: dto.id });
    let ret: any;
    if (exist) {
      ret = this.save(dto);
    }
    return ret;
  }

  async getById(id: string): Promise<UserProfile> {
    const query = this.createQueryBuilder('user_profile');
    const result = (await query
      .where("user_id = :id", { id })
      .getMany()).shift();

    if (!result) {
      throw new NotFoundException(`user profile with ID "${id}" not found`);
    }
    return result;
  }

}


