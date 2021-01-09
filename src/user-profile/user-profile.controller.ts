
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './user-profile.entity';
import { IUserProfileDto } from './user-profile.dto';

@Controller('user-profile')
export class UserProfileController {
  constructor(private srv: UserProfileService) { }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<UserProfile> {
    return this.srv.getById(id);
  }

  @Patch()
  updateProfile(@Body() dto: IUserProfileDto): Promise<IUserProfileDto> {
    return this.srv.updateProfile(dto);
  }
}
