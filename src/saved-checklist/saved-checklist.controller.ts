
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';
import { SavedChecklistService } from './saved-checklist.service';
import { GetSavedChecklistDto, ISavedChecklistDto } from './saved-checklist.dto';

@Controller('saved-checklist')
export class SavedChecklistController {
  constructor(private srv: SavedChecklistService) { }

  @Delete('/:id')
  deleteById(@Param('id') id: string): Promise<void> {
    return this.srv.deleteById(id);
  }
  
  @Get('/:id')
  getById(@Param('id') id: string): Promise<ISavedChecklistDto[]> {
    return this.srv.getChecklistsById(id);
  }

  @Get()
  getAll(@Query() dto: GetSavedChecklistDto): Promise<ISavedChecklistDto[]> {
    return this.srv.getChecklists(dto);
  }

  @Post()
  create(@Body() dto: ISavedChecklistDto): Promise<ISavedChecklistDto> {
    return this.srv.saveChecklist(dto);
  }
}
