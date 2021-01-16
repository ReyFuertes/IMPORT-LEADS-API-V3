import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { GetUserDto, IUserDto } from './user.dto';
import { User } from './user.entity';
import { AuthService } from '../auth/auth-service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectRepository(UserRepository) public repo: UserRepository) {
    super(repo);
  }

  async getById(id: string): Promise<IUserDto> {
    return this.repo.getById(id);
  }

  async updateUser(dto: IUserDto): Promise<void> {
    return this.repo.updateUser(dto);
  }

  async deleteById(id: string): Promise<IUserDto> {
    return this.repo.deleteUser(id);
  }

  async createUser(dto: IUserDto): Promise<IUserDto[]> {
    return this.repo.createUser(dto);
  }

  async getAllUsers(dto: GetUserDto): Promise<IUserDto[]> {
    return this.repo.getAllUsers(dto)
  }
}
