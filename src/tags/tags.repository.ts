import { sqlOp } from './../models/generic.model';
import { ResTagDto, TagGetDto } from './tags.dto';
import { Tag } from './tags.entity';
import { Repository, EntityRepository } from 'typeorm';
import _ = require("lodash");

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {

  async getTags(): Promise<ResTagDto> {
    const query = this.createQueryBuilder('tag');
    const results = await query
      .leftJoinAndSelect('tag.questions','tag_question.tag')
      .getMany();

    return results;
  }
}