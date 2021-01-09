import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';
import { IInspectionChecklistImageDto } from './inspection-checklist-image.dto';
import { InspectionChecklistImageService } from './inspection-checklist-image.service';

@Controller('inspection-checklist-image')
export class InspectionChecklistImageController {
  constructor(private srv: InspectionChecklistImageService) { }

  @Delete('/:id')
  deleteById(@Param('id') id: string): Promise<IInspectionChecklistImageDto> {
    return this.srv.deleteById(id);
  }

  @Post()
  save(@Body() dto: IInspectionChecklistImageDto[]): Promise<IInspectionChecklistImageDto[]> {
    return this.srv.saveInsImage(dto);
  }
}
