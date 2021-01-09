import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';
import { InspectionChecklistReportService } from './inspection-checklist-report.service';

@Controller('inspection-report')
export class InspectionChecklistReportController {
  constructor(private srv: InspectionChecklistReportService) { }

  @Post('products')
  async getProductReport(@Body() dto: { id: string }): Promise<any> {
    return this.srv.getProductReport(dto.id);
  }

  @Get(':id')
  async getBarReport(@Param('id') id: string): Promise<any> {
    return this.srv.getBarReport(id);
  }
}
