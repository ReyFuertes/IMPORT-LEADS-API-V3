import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res, UseGuards } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { IUserRoleDto } from './user-role.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-role')
export class UserRoleController {
  constructor(private srv: UserRoleService) { }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<number[]> {
    return this.srv.getById(id);
  }

  @Post()
  //@UseGuards(AuthGuard('jwt'))
  create(@Body() dto: any): Promise<IUserRoleDto> {
    return this.srv.saveUserRole(dto);
  }
}
