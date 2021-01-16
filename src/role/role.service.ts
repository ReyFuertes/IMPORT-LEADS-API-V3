import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';
import { GetRoleDto, IRoleDto } from './role.dto';
import { UserRoleRepository } from '../user-role/user-role.repository';
import { RoleRepository } from './role.repository';
import { Role } from './role.entity';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(@InjectRepository(RoleRepository) public repo: RoleRepository) {
    super(repo);
  }

  async getAllRole(dto: GetRoleDto): Promise<IRoleDto[]> {
    return this.repo.getAllRole(dto)
  }
}
