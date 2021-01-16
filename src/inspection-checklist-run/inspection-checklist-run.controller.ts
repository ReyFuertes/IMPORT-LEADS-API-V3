import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res, UseGuards } from '@nestjs/common';
import { InspectionChecklistRunService } from './inspection-checklist-run.service';
import { IInspectionChecklistRunDto, IInspectionRunDto } from './inspection-checklist-run.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('inspection-checklist-run')
export class InspectionChecklistRunController {
  constructor(private srv: InspectionChecklistRunService) { }

  @Delete('/:id')
  ////@UseGuards(AuthGuard('jwt'))
  deleteById(@Param('id') id: string): Promise<void> {
    return this.srv.deleteById(id);
  }

  @Post('navigate-to')
  ////@UseGuards(AuthGuard('jwt'))
  navigateTo(@Body() dto: { saved_checklist_id: string, position: number }): Promise<IInspectionChecklistRunDto> {
    return this.srv.navigateTo(dto);
  }

  @Post('/copy')
  ////@UseGuards(AuthGuard('jwt'))
  copy(@Body() dto: { id: string, copyCount: number, contractProductId: string }): Promise<string> {
    return this.srv.copy(dto);
  }

  @Post('/remove-navigate-to')
  ////@UseGuards(AuthGuard('jwt'))
  removeAndNavigateTo(@Body() dto: { id: string }): Promise<IInspectionChecklistRunDto> {
    return this.srv.removeAndNavigateTo(dto);
  }

  @Post('prev')
  ////@UseGuards(AuthGuard('jwt'))
  prev(@Body() dto: any): Promise<IInspectionChecklistRunDto[]> {
    return this.srv.prev(dto);
  }

  @Post('next')
  ////@UseGuards(AuthGuard('jwt'))
  next(@Body() dto: any): Promise<IInspectionChecklistRunDto[]> {
    return this.srv.next(dto);
  }

  @Get('/:id')
  getInspectionsRunById(@Param('id') id: string): Promise<IInspectionChecklistRunDto[]> {
    return this.srv.getInspectionsRunById(id);
  }

  @Post()
  ////@UseGuards(AuthGuard('jwt'))
  run(@Body() dto: IInspectionRunDto): Promise<IInspectionRunDto> {
    return this.srv.run(dto);
  }
}
