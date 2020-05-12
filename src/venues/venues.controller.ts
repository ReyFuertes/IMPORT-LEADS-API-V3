import { VenuesService } from './venues.service';
import { GetVenuesDto } from './dto/get-venues-dto';
import { Venue } from './venues.entity';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query } from '@nestjs/common';

@Controller('venues')
export class VenuesController {
  constructor(private venuesService: VenuesService) { }
  @Get()
  getAll(@Query() getVenuesDto: GetVenuesDto ): Promise<Venue[]> {
    return this.venuesService.getAllVenues(getVenuesDto);
  }
 
}
