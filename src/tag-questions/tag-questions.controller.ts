import { TagGetDto, ResTagDto } from './tag-questions.dto';
import { TagQuestionsService } from './tag-questions.service';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';

@Controller('tags')
export class TagQuestionsController {
  constructor(private srv: TagQuestionsService) { }

  @Get()
  getByTagId(@Param('id') id: string): Promise<ResTagDto> {
    return this.srv.getQuestionByTagId(id);
  }
}
