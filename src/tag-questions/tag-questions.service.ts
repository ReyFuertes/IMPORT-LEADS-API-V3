import { ResTagDto } from './tag-questions.dto';
import { TagQuestionRepository } from './tag-questions.repository';
import { TagQuestion } from './tag-questions.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';

@Injectable()
export class TagQuestionsService extends BaseService<TagQuestion> {
  constructor(@InjectRepository(TagQuestionRepository) public repo: TagQuestionRepository) {
    super(repo);
  }

  async deleteById(id: string): Promise<TagQuestion> {
    return this.repo.deleteQuestion(id);
  }

  async createTagQuestion(dto: TagQuestion): Promise<TagQuestion> {
    return this.repo.saveTagQuestion(dto);
  }

  async getQuestionByTagId(id: string): Promise<ResTagDto> {
    return this.repo.getQuestionByTagId(id);
  }
}
