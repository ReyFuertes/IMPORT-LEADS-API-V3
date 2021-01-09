
import { GCDto } from '../contracts/contracts.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { UserProfile } from './user-profile.entity';
import { UserProfileRepository } from './user-profile.repository';
import { IUserProfileDto } from './user-profile.dto';

@Injectable()
export class UserProfileService extends BaseService<UserProfile> {
  constructor(@InjectRepository(UserProfileRepository) public repo: UserProfileRepository) {
    super(repo);
  }

  async updateProfile(dto: IUserProfileDto): Promise<IUserProfileDto> {
    return this.repo.updateProfile(dto);
  }

  async getById(id: string): Promise<UserProfile> {
    return this.repo.getById(id);
  }
}
