import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContractTemplateDto } from './contract-template.dto';
import { ContractTemplateService } from './contract-template.service';

@Controller('contract-template')
export class ContractTemplateController {

  constructor(private srv: ContractTemplateService) { }

  @Post('/import')
  //////@UseGuards(AuthGuard('jwt'))
  import(@Body() dto: any): Promise<any> {
    return this.srv.import(dto);
  }

  @Get()
  getAll(@Query() getAllDto: any): Promise<any> {
    return this.srv.getSavedContracts(getAllDto);
  }

  @Post()
  //////@UseGuards(AuthGuard('jwt'))
  create(@Body() dto: any): Promise<ContractTemplateDto> {
    return this.srv.saveContractTemplate(dto);
  }
}