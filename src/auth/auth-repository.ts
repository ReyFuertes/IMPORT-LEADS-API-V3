import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import * as _ from 'lodash';
import { AuthCredentialDto } from './auth.dto';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserProfileRepository } from '../user-profile/user-profile.repository';
import { User } from '../user/user.entity';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signUp(authCredsDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      const result = await user.save();

      /* create temporary user profile */
      const user_profile_repo = getCustomRepository(UserProfileRepository);
      const payload = { user: result };
      await user_profile_repo.save(payload);

    } catch (error) {
      throw new ConflictException('Signup unsuccesful');
    }
  }

  async validatePassword(authCredsDto: AuthCredentialDto): Promise<User> {
    const { username, password } = authCredsDto;
    const user = await this.findOne({ username }, { relations: ['user_profile'] });

    if (user && await user.validatePassword(password)) {
      return user;
    } else {
      return null;
    }
  }

  async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}


