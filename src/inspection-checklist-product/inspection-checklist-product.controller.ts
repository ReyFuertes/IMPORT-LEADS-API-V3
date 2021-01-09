import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';
import { InspectionChecklistProductService } from './inspection-checklist-product.service';

@Controller('inspection-checklist-product')
export class InspectionChecklistProductController {
  constructor(private srv: InspectionChecklistProductService) { }
}
