import { sqlOp } from './../models/generic.model';
import { ResTagDto, TagGetDto } from './tags.dto';
import { Tag } from './tags.entity';
import { Repository, EntityRepository } from 'typeorm';
import _ = require("lodash");

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {

  async updateTag(item: Tag): Promise<Tag> {
    return this.save(item);
  }

  async deleteTag(id: string): Promise<Tag> {
    const exist = await this.findOne({ id });
    if (exist) {
      this.createQueryBuilder()
        .delete()
        .from(Tag)
        .where("id = :id", { id })
        .execute();

      return exist;
    }
    return null;
  }

  async saveTag(dto: Tag): Promise<Tag> {
    return this.save(dto);
  }

  async getTags(): Promise<Tag[]> {
    const query = this.createQueryBuilder('tag');
    const results = await query
      .leftJoinAndSelect('tag.questions', 'tag_question.tag')
      .getMany();

    return results;
  }
}