import { GCDto } from './../contracts/contracts.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';
import { UserAccessRepository } from './user-access.repository';
import { IUserAccessDto, GetUserAccesDto } from './user-access.dto';
import { UserAccess } from './user-access.entity';

@Injectable()
export class UserAccessService extends BaseService<UserAccess> {
  constructor(@InjectRepository(UserAccessRepository) public repo: UserAccessRepository) {
    super(repo);
  }

  async getById(id: string): Promise<string[]> {
    return this.repo.getById(id);
  }

  async saveUserAccess(dto: IUserAccessDto): Promise<IUserAccessDto[]> {
    return this.repo.saveUserAccess(dto);
  }
}
