import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res, UseGuards } from '@nestjs/common';
import { InspectionChecklistCommentService } from './inspection-checklist-comment.service';
import { IInspectionChecklistCommentDto, GetInspectionChecklistCommentDto } from './inspection-checklist-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('inspection-checklist-comment')
export class InspectionChecklistCommentController {
  constructor(private srv: InspectionChecklistCommentService) { }

  @Patch()
  //////@UseGuards(AuthGuard('jwt'))
  update(@Body() dto: IInspectionChecklistCommentDto): Promise<IInspectionChecklistCommentDto> {
    return this.srv.updateChecklist(dto);
  }

  @Delete('/:id')
  //////@UseGuards(AuthGuard('jwt'))
  deleteById(@Param('id') id: string): Promise<void> {
    return this.srv.deleteById(id);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<IInspectionChecklistCommentDto[]> {
    return this.srv.getChecklists(id);
  }

  @Post()
  //////@UseGuards(AuthGuard('jwt'))
  saveChecklist(@Body() dto: IInspectionChecklistCommentDto): Promise<IInspectionChecklistCommentDto> {
    return this.srv.saveChecklist(dto);
  }
}
