import { ResTagDto } from './tag-questions.dto';
import { TagQuestion } from './tag-questions.entity';
import { Repository, EntityRepository } from 'typeorm';
import * as _ from 'lodash';

@EntityRepository(TagQuestion)
export class TagQuestionRepository extends Repository<TagQuestion> {

  async deleteQuestion(id: string): Promise<TagQuestion> {
    const exist = await this.findOne({ id });
    if (exist) {
      this.createQueryBuilder()
        .delete()
        .from(TagQuestion)
        .where("id = :id", { id })
        .execute();

      return exist;
    }
    return null;
  }

  async saveTagQuestion(dto: TagQuestion): Promise<TagQuestion> {
    return this.save(dto);
  }

  async getQuestionByTagId(id: string): Promise<ResTagDto> {
    const query = this.createQueryBuilder('tag_question');
    const results = await query.getMany();
    return results;
  }
}