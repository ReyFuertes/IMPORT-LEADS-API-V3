import { ResTagDto } from './tag-questions.dto';
import { TagQuestion } from './tag-questions.entity';
import { Repository, EntityRepository } from 'typeorm';
import _ = require("lodash");

@EntityRepository(TagQuestion)
export class TagQuestionRepository extends Repository<TagQuestion> {

  async getQuestionByTagId(id: string): Promise<ResTagDto> {
    const query = this.createQueryBuilder('tag_question');
    const results = await query.getMany();
    return results;
  }
}