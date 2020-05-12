import { ResTagDto } from './tag-questions.dto';
import { TagQuestionRepository } from './tag-questions.repository';
import { TagQuestion } from './tag-questions.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';

@Injectable()
export class TagQuestionsService extends BaseService<TagQuestion> {
  constructor(@InjectRepository(TagQuestionRepository) public repo: TagQuestionRepository) {
    super(repo);
  }

  async getQuestionByTagId(id: string): Promise<ResTagDto> {
    return this.repo.getQuestionByTagId(id);
  }
}
