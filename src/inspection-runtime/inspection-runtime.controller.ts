import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';
import { InspectionRuntimeService } from './inspection-runtime.service';

@Controller('inspection-runtime')
export class InspectionRuntimeController {
  constructor(private srv: InspectionRuntimeService) { }

  @Post('status')
  changeStatus(@Body() dto: any): Promise<any> {
    return this.srv.changeStatus(dto);
  }
}
