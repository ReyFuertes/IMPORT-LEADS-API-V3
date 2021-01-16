import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';
import { AuthCredentialDto, IUserAuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth-repository';
import { User } from '../user/user.entity';
import { IUserDto } from '../user/user.dto';

@Injectable()
export class AuthService extends BaseService<User> {
  constructor(@InjectRepository(AuthRepository) public repo: AuthRepository, private jwtSrv: JwtService) {
    super(repo);
  }

  async signIn(authCredsDto: AuthCredentialDto): Promise<IUserAuthDto> {
    const user: IUserDto = await this.repo.validatePassword(authCredsDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    } else {
      const payload = { id: user.id, username: user.username };
      const accessToken = await this.jwtSrv.sign(payload);

      return { accessToken, user: { id: user?.id, username: user?.username, image: user?.user_profile?.image } };
    }
  }

  async signUp(authCredsDto: AuthCredentialDto): Promise<void> {
    return this.repo.signUp(authCredsDto);
  }
}
