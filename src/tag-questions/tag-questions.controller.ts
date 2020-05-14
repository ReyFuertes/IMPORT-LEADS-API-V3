import { TagQuestion } from './tag-questions.entity';
import { TagGetDto, ResTagDto } from './tag-questions.dto';
import { TagQuestionsService } from './tag-questions.service';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';

@Controller('tag-questions')
export class TagQuestionsController {
  constructor(private srv: TagQuestionsService) { }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<TagQuestion> {
    return this.srv.deleteById(id);
  }

  @Post()
  create(@Body() dto: TagQuestion): Promise<TagQuestion> {
    return this.srv.createTagQuestion(dto);
  }

  @Get()
  getByTagId(@Param('id') id: string): Promise<ResTagDto> {
    return this.srv.getQuestionByTagId(id);
  }
}
