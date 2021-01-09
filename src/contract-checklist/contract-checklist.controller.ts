import { ContractChecklist } from './contract-checklist.entity';
import { IChecklistDto, IChecklistProdArrDto, GetChecklistDto, ReContractChecklistDto, OverrideChecklistItemDto } from './contract-checklist.dto';
import { ContractChecklistService } from './contract-checklist.service';
import { Controller, Post, Body, Query, ParseIntPipe, Param, Get, Patch, Delete } from '@nestjs/common';

@Controller('contract-checklist')
export class ContractChecklistController {
  constructor(private srv: ContractChecklistService) { }

  // @Post('/apply-changes')
  // applyChanges(@Body() dto: OverrideChecklistItemDto): Promise<IChecklistDto[]> {
  //   return this.srv.applyChanges(dto);
  // }

  // @Post('/override')
  // override(@Body() dto: OverrideChecklistItemDto): Promise<IChecklistDto[]> {
  //   return this.srv.override(dto);
  // }

  // @Delete('/:id')
  // delete(@Param('id') id: string): Promise<ContractChecklist> {
  //   return this.srv.deleteById(id);
  // }

  // @Get()
  // getAll(@Query() dto: GetChecklistDto): Promise<IChecklistDto[]> {
  //   return this.srv.getChecklists(dto);
  // }

  // @Post()
  // create(@Body() dto: IChecklistProdArrDto): Promise<IChecklistDto[]> {
  //   return this.srv.saveChecklist(dto);
  // }

  // @Post('/multi-delete')
  // multipleDelete(@Body() dto: IChecklistProdArrDto[]): Promise<IChecklistDto[]> {
  //   return this.srv.multipleDelete(dto);
  // }
}