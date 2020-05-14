import { Tag } from './tags.entity';
import { TagGetDto, ResTagDto } from './tags.dto';
import { TagsService } from './tags.service';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';

@Controller('tags')
export class TagsController {
  constructor(private srv: TagsService) { }

  @Patch()
  update(@Body() dto: Tag): Promise<Tag> {
    return this.srv.updateTag(dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<Tag> {
    return this.srv.deleteById(id);
  }

  @Post()
  create(@Body() dto: Tag): Promise<Tag> {
    return this.srv.createTag(dto);
  }

  @Get()
  getAll(): Promise<Tag[]> {
    return this.srv.getTags();
  }
}
