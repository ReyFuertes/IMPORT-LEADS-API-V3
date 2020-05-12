import { TagGetDto, ResTagDto } from './tags.dto';
import { TagsService } from './tags.service';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';

@Controller('tags')
export class TagsController {
  constructor(private srv: TagsService) { }

  @Get()
  getAll(): Promise<ResTagDto> {
    return this.srv.getTags();
  }
}
