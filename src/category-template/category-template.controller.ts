import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';
import { CategoryTemplateDto } from './category-template.dto';
import { CategoryTemplateService } from './category-template.service';

@Controller('category-template')
export class CategoryTemplateController {

  constructor(private srv: CategoryTemplateService) { }

  @Get()
  getAll(@Query() getAllDto: any): Promise<any> {
    return this.srv.getSavedCategorys(getAllDto);
  }

  @Post()
  create(@Body() dto: any): Promise<CategoryTemplateDto> {
    return this.srv.saveCategoryTemplate(dto);
  }
}