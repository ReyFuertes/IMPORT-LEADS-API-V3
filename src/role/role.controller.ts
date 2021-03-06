import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';
import { GetRoleDto, IRoleDto } from './role.dto';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private srv: RoleService) { }

  @Get()
  getAll(@Query() dto: GetRoleDto): Promise<IRoleDto[]> {
    return this.srv.getAllRole(dto);
  }
}
