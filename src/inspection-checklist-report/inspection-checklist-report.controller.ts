import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InspectionChecklistReportService } from './inspection-checklist-report.service';

@Controller('inspection-report')
export class InspectionChecklistReportController {
  constructor(private srv: InspectionChecklistReportService) { }

  @Post('products')
  ////@UseGuards(AuthGuard('jwt'))
  async getProductReport(@Body() dto: { id: string }): Promise<any> {
    return this.srv.getProductReport(dto.id);
  }

  @Get(':id')
  async getBarReport(@Param('id') id: string): Promise<any> {
    return this.srv.getBarReport(id);
  }
}
