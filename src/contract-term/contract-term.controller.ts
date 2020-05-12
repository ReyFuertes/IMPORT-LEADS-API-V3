import { ContractTermDto } from './contract-term.dto';
import { ContractTermService } from './contract-term.service';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';

@Controller('contract-term')
export class ContractTermController {
  constructor(private srv: ContractTermService) { }

  @Patch()
  update(@Body() dto: ContractTermDto): Promise<ContractTermDto> {
    return this.srv.updateTerm(dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<ContractTermDto> {
    return this.srv.deleteById(id);
  }

  @Post()
  create(@Body() dto: ContractTermDto): Promise<ContractTermDto> {
    return this.srv.createTerm(dto);
  }
}
