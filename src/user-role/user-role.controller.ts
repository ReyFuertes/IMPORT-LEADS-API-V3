import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { IUserRoleDto } from './user-role.dto';

@Controller('user-role')
export class UserRoleController {
  constructor(private srv: UserRoleService) { }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<number[]> {
    return this.srv.getById(id);
  }

  @Post()
  create(@Body() dto: any): Promise<IUserRoleDto> {
    return this.srv.saveUserRole(dto);
  }
}
