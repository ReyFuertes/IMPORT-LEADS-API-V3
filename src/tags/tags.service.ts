import { ResTagDto, TagGetDto } from './tags.dto';
import { TagRepository } from './tags.repository';
import { Tag } from './tags.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';

@Injectable()
export class TagsService extends BaseService<Tag> {
  constructor(@InjectRepository(TagRepository) public repo: TagRepository) {
    super(repo);
  }

  async getTags(): Promise<ResTagDto> {
    return this.repo.getTags();
  }
}
