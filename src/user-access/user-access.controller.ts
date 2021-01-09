import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';
import { UserAccessService } from './user-access.service';
import { GetUserAccesDto, IUserAccessDto } from './user-access.dto';

@Controller('user-access')
export class UserAccessController {
  constructor(private srv: UserAccessService) { }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<string[]> {
    return this.srv.getById(id);
  }

  @Post()
  create(@Body() dto: IUserAccessDto): Promise<IUserAccessDto[]> {
    return this.srv.saveUserAccess(dto);
  }
}
