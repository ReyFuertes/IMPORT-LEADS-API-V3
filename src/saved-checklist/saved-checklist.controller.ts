
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res, UseGuards } from '@nestjs/common';
import { SavedChecklistService } from './saved-checklist.service';
import { GetSavedChecklistDto, ISavedChecklistDto } from './saved-checklist.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('saved-checklist')
export class SavedChecklistController {
  constructor(private srv: SavedChecklistService) { }

  @Delete('/:id')
  ////@UseGuards(AuthGuard('jwt'))
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
  ////@UseGuards(AuthGuard('jwt'))
  create(@Body() dto: ISavedChecklistDto): Promise<ISavedChecklistDto> {
    return this.srv.saveChecklist(dto);
  }
}
