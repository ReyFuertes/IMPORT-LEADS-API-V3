import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetInspectionDto } from './inspection.dto';
import { InspectionService } from './inspection.service';

@Controller('inspection')
export class InspectionController {
  constructor(private srv: InspectionService) { }

  @Patch('finish')
  //////@UseGuards(AuthGuard('jwt'))
  finish(@Body() dto: any): Promise<any> {
    return this.srv.finishInspection(dto);
  }

  @Delete('/:id')
  //////@UseGuards(AuthGuard('jwt'))
  deleteById(@Param('id') id: string): Promise<void> {
    return this.srv.deleteById(id);
  }
  
  @Get()
  getActiveInspection(@Query() dto: GetInspectionDto): Promise<any> {
    return this.srv.getActiveInspection(dto);
  }

  @Get('/finished')
  //////@UseGuards(AuthGuard('jwt'))
  getFinishedInspection(@Query() dto: GetInspectionDto): Promise<any> {
    return this.srv.getFinishedInspection(dto);
  }
}
