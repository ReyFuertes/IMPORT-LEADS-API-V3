import { ResTagDto, TagGetDto } from './tags.dto';
import { TagRepository } from './tags.repository';
import { Tag } from './tags.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';

@Injectable()
export class TagsService extends BaseService<Tag> {
  constructor(@InjectRepository(TagRepository) public repo: TagRepository) {
    super(repo);
  }

  async updateTag(dto: Tag): Promise<Tag> {
    return this.repo.saveTag(dto);
  }

  async deleteById(id: string): Promise<Tag> {
    return this.repo.deleteTag(id);
  }

  async createTag(dto: Tag): Promise<Tag> {
    return this.repo.saveTag(dto);
  }

  async getTags(): Promise<Tag[]> {
    return this.repo.getTags();
  }
}
