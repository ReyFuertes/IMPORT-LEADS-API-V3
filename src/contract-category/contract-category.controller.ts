import { ContractCategoryDto } from './contract-category.dto';
import { ContractCategoryService } from './contract-category.service';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('contract-category')
export class ContractCategoryController {
  constructor(private srv: ContractCategoryService) { }

  @Get()
  getAll(@Query() getAllDto: any ): Promise<any> {
    return this.srv.getAllContractCategories(getAllDto);
  }

  @Post('/down')
  //////@UseGuards(AuthGuard('jwt'))
  moveDown(@Body() dto: any): Promise<any> {
    return this.srv.moveDown(dto);
  }

  @Post('/up')
  //////@UseGuards(AuthGuard('jwt'))
  moveUp(@Body() dto: any): Promise<any> {
    return this.srv.moveUp(dto);
  }

  @Patch()
  //////@UseGuards(AuthGuard('jwt'))
  patch(@Body() dto: ContractCategoryDto): Promise<ContractCategoryDto> {
    return this.srv.saveContractCategory(dto);
  }

  @Post('/term')
  //////@UseGuards(AuthGuard('jwt'))
  createTerm(@Body() dto: ContractCategoryDto): Promise<ContractCategoryDto> {
    return this.srv.createContractTerm(dto);
  }

  @Get('/:id/contract')
  //////@UseGuards(AuthGuard('jwt'))
  getByContractId(@Param('id') id: string): Promise<any[]> {
    return this.srv.getByContractId(id);
  }

  @Delete('/:id')
  //////@UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string): Promise<ContractCategoryDto> {
    return this.srv.deleteById(id);
  }

  @Post()
  //////@UseGuards(AuthGuard('jwt'))
  create(@Body() dto: ContractCategoryDto): Promise<ContractCategoryDto> {
    return this.srv.createContractCategory(dto);
  }

  @Post('multiple')
  //////@UseGuards(AuthGuard('jwt'))
  saveMultiple(@Body() dto: ContractCategoryDto[]): Promise<ContractCategoryDto[]> {
    return this.srv.saveMultiple(dto);
  }

  // @Patch()
  // update(@Body() dto: ContractCategoryDto): Promise<ContractCategoryDto> {
  //   return this.srv.updateCategory(dto);
  // }
}
