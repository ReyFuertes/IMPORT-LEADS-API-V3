import { ReqCPDto, ContractProductResponseDto } from './contract-product.dto';
import { CPService } from './contract-products.service';
import { Controller, Post, Body, Delete, ParseIntPipe, Param, Get, Patch } from '@nestjs/common';

@Controller('contract-products')
export class CPController {
  constructor(private contractProductsSrv: CPService) { }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<ContractProductResponseDto[]> {
    return this.contractProductsSrv.getByContractId(id);
  }

  @Post()
  create(@Body() dto: ReqCPDto): Promise<ContractProductResponseDto> {
    return this.contractProductsSrv.saveContractProduct(dto);
  }

  @Patch()
  update(@Body() dto: ReqCPDto): Promise<ContractProductResponseDto> {
    return this.contractProductsSrv.saveContractProduct(dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.contractProductsSrv.deleteById(id);
  }
}
