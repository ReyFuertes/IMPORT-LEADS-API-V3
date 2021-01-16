import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialDto, IUserAuthDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth-service';

@Controller('auth')
export class AuthController {
  constructor(private srv: AuthService) { }
  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredsDto: AuthCredentialDto): Promise<IUserAuthDto> {
    return this.srv.signIn(authCredsDto)
  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredsDto: AuthCredentialDto) {
    return this.srv.signUp(authCredsDto)
  }

  @Post('/test')
  //////@UseGuards(AuthGuard('jwt'))
  test(@Req() req) {
    console.log(req)
  }
}
