import { TagQuestionsService } from './tag-questions.service';
import { TagQuestionsController } from './tag-questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagQuestionRepository } from './tag-questions.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([TagQuestionRepository])],
  controllers: [TagQuestionsController],
  providers: [TagQuestionsService]
})
export class TagQuestionsModule {}
