import { join } from 'path';
import { Contract } from './contracts.entity';
import { ContractsService } from './contracts.service';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';
import { ReqCDto, GCDto, ResCDto } from './contracts.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private srv: ContractsService) { }

  @Get()
  getAll(@Query() getAllDto: GCDto ): Promise<ResCDto> {
    return this.srv.getContracts(getAllDto);
  }

  @Post()
  create(@Body() createDto: ReqCDto): Promise<Contract> {
    return this.srv.createContract(createDto);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Contract> {
    return this.srv.getById(id);
  }

  @Patch()
  update(@Body() updateDto: Contract): Promise<Contract> {
    return this.srv.updateContract(updateDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<Contract> {
    return this.srv.deleteById(id);
  }
  
  @Get('image/:filename')
  get(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: join(__dirname, '../../uploads/images/') });
  }
}
