import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { UserRole } from './user-role.entity';
import { IUserRoleDto } from './user-role.dto';
import { UserRoleRepository } from './user-role.repository';

@Injectable()
export class UserRoleService extends BaseService<UserRole> {
  constructor(@InjectRepository(UserRoleRepository) public repo: UserRoleRepository) {
    super(repo);
  }

  async getById(id: string): Promise<number[]> {
    return this.repo.getById(id);
  }

  async saveUserRole(dto: any): Promise<IUserRoleDto> {
    return this.repo.saveUserRole(dto);
  }
}
