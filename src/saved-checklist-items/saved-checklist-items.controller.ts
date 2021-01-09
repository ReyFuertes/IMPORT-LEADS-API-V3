
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';
import { SavedChecklistItemsService } from './saved-checklist-items.service';

@Controller('saved_checklist_items')
export class SavedChecklistItemsController {
  constructor(private srv: SavedChecklistItemsService) { }

}
