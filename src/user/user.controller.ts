import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { IUserDto, GetUserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private srv: UserService) { }

  @Get('/:id')
  //////@UseGuards(AuthGuard('jwt'))
  getById(@Param('id') id: string): Promise<IUserDto> {
    return this.srv.getById(id);
  }

  @Delete('/:id')
  //////@UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string): Promise<IUserDto> {
    return this.srv.deleteById(id);
  }

  @Get()
  getAll(@Query() dto: GetUserDto): Promise<IUserDto[]> {
    return this.srv.getAllUsers(dto);
  }

  @Post()
  //////@UseGuards(AuthGuard('jwt'))
  create(@Body() dto: IUserDto): Promise<IUserDto[]> {
    return this.srv.createUser(dto);
  }

  @Patch()
  //////@UseGuards(AuthGuard('jwt'))
  update(@Body() dto: IUserDto): Promise<void> {
    return this.srv.updateUser(dto);
  }
}
