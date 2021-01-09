import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';
import { InspectionChecklistRunService } from './inspection-checklist-run.service';
import { IInspectionChecklistRunDto, IInspectionRunDto } from './inspection-checklist-run.dto';

@Controller('inspection-checklist-run')
export class InspectionChecklistRunController {
  constructor(private srv: InspectionChecklistRunService) { }

  @Delete('/:id')
  deleteById(@Param('id') id: string): Promise<void> {
    return this.srv.deleteById(id);
  }

  @Post('navigate-to')
  navigateTo(@Body() dto: { saved_checklist_id: string, position: number }): Promise<IInspectionChecklistRunDto> {
    return this.srv.navigateTo(dto);
  }

  @Post('/copy')
  copy(@Body() dto: { id: string, copyCount: number, contractProductId: string }): Promise<string> {
    return this.srv.copy(dto);
  }

  @Post('/remove-navigate-to')
  removeAndNavigateTo(@Body() dto: { id: string }): Promise<IInspectionChecklistRunDto> {
    return this.srv.removeAndNavigateTo(dto);
  }

  @Post('prev')
  prev(@Body() dto: any): Promise<IInspectionChecklistRunDto[]> {
    return this.srv.prev(dto);
  }

  @Post('next')
  next(@Body() dto: any): Promise<IInspectionChecklistRunDto[]> {
    return this.srv.next(dto);
  }

  @Get('/:id')
  getInspectionsRunById(@Param('id') id: string): Promise<IInspectionChecklistRunDto[]> {
    return this.srv.getInspectionsRunById(id);
  }

  @Post()
  run(@Body() dto: IInspectionRunDto): Promise<IInspectionRunDto> {
    return this.srv.run(dto);
  }
}
