import { join } from 'path';
import { Contract } from './contracts.entity';
import { ContractsService } from './contracts.service';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';
import { ReqCDto, GCDto, ResCDto } from './contracts.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private contractsService: ContractsService) { }

  @Get()
  getAll(@Query() getAllDto: GCDto ): Promise<ResCDto> {
    return this.contractsService.getContracts(getAllDto);
  }

  @Post()
  create(@Body() createDto: ReqCDto): Promise<Contract> {
    return this.contractsService.createContract(createDto);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Contract> {
    return this.contractsService.getById(id);
  }

  @Patch()
  update(@Body() updateDto: Contract): Promise<Contract> {
    return this.contractsService.updateContract(updateDto);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.contractsService.deleteById(id);
  }
  
  @Get('image/:filename')
  get(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: join(__dirname, '../../uploads/images/') });
  }
}
