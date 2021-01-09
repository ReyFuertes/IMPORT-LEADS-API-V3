import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from "./auth.dto";
import { User } from "src/user/user.entity";
import { AuthRepository } from "./auth-repository";

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AuthRepository) public repo: AuthRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topsecretbenbooterkooper',
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.repo.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('');
    }
    return user;
  }
}