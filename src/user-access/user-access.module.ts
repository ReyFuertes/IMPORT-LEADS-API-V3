import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserAccessRepository } from './user-access.repository';
import { UserAccessController } from './user-access.controller';
import { UserAccessService } from './user-access.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccessRepository])],
  controllers: [UserAccessController],
  providers: [UserAccessService]
})
export class UserAccessModule { }
