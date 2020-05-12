import { ContractCategoryDto } from './../contract-category/contract-category.dto';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
  constructor(private srv: CategoryService) { }

  @Get('/:id')
  getAll(@Param('id') id: string): Promise<CategoryDto[]> {
    return this.srv.getCategoryByContractId(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<CategoryDto> {
    return this.srv.deleteById(id);
  }

  @Post()
  createContractCategory(@Body() dto: ContractCategoryDto): Promise<Category> {
    const { category } = dto;
    return this.srv.createCategory(category);
  }

  @Patch()
  update(@Body() dto: Category): Promise<Category> {
    return this.srv.updateCategory(dto);
  }
}
