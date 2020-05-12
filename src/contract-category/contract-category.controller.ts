import { ContractCategoryDto } from './contract-category.dto';
import { ContractCategoryService } from './contract-category.service';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';

@Controller('contract-category')
export class ContractCategoryController {
  constructor(private srv: ContractCategoryService) { }

  @Patch()
  patch(@Body() dto: ContractCategoryDto): Promise<ContractCategoryDto> {
    return this.srv.saveContractCategory(dto);
  }

  @Post('/term')
  createTerm(@Body() dto: ContractCategoryDto): Promise<ContractCategoryDto> {
    return this.srv.createContractTerm(dto);
  }

  @Get('/:id/contract')
  getByContractId(@Param('id') id: string): Promise<any[]> {
    return this.srv.getByContractId(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<ContractCategoryDto> {
    return this.srv.deleteById(id);
  }

  @Post()
  create(@Body() dto: ContractCategoryDto): Promise<ContractCategoryDto> {
    return this.srv.createContractCategory(dto);
  }

  // @Patch()
  // update(@Body() dto: ContractCategoryDto): Promise<ContractCategoryDto> {
  //   return this.srv.updateCategory(dto);
  // }
}
