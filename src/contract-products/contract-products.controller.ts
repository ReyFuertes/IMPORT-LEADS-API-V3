import { ReqCPDto, ContractProductResponseDto } from './contract-product.dto';
import { CPService } from './contract-products.service';
import { Controller, Post, Body, Delete, ParseIntPipe, Param, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('contract-products')
export class CPController {
  constructor(private contractProductsSrv: CPService) { }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<ContractProductResponseDto[]> {
    return this.contractProductsSrv.getByContractId(id);
  }

  @Post()
  //////@UseGuards(AuthGuard('jwt'))
  create(@Body() dto: ReqCPDto): Promise<ContractProductResponseDto> {
    return this.contractProductsSrv.saveContractProduct(dto);
  }

  @Patch()
  //////@UseGuards(AuthGuard('jwt'))
  update(@Body() dto: ReqCPDto): Promise<ContractProductResponseDto> {
    return this.contractProductsSrv.saveContractProduct(dto);
  }

  @Delete('/:id')
  //////@UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string): Promise<void> {
    return this.contractProductsSrv.deleteById(id);
  }
}
