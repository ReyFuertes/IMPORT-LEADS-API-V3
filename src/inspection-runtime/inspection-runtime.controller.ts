import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InspectionRuntimeService } from './inspection-runtime.service';

@Controller('inspection-runtime')
export class InspectionRuntimeController {
  constructor(private srv: InspectionRuntimeService) { }

  @Post('status')
  ////@UseGuards(AuthGuard('jwt'))
  changeStatus(@Body() dto: any): Promise<any> {
    return this.srv.changeStatus(dto);
  }
}
