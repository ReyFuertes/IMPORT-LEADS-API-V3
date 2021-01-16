
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res, UseGuards } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './user-profile.entity';
import { IUserProfileDto } from './user-profile.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-profile')
export class UserProfileController {
  constructor(private srv: UserProfileService) { }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<UserProfile> {
    return this.srv.getById(id);
  }

  @Patch()
  //@UseGuards(AuthGuard('jwt'))
  updateProfile(@Body() dto: IUserProfileDto): Promise<IUserProfileDto> {
    return this.srv.updateProfile(dto);
  }
}
