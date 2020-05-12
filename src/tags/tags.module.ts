import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './tags.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([TagRepository])],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
