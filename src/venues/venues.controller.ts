import { UploadService } from './../upload/upload.service';
import { VenuesService } from './venues.service';
import { Venue } from './venues.entity';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query } from '@nestjs/common';
import { ReqVenueDto, DeleteVenueDto, IVenueDto } from './venues.dto';

@Controller('venues')
export class VenuesController {
  constructor(private srv: VenuesService) { }
  
  @Get()
  getAll(): Promise<IVenueDto[]> {
    return this.srv.getAllVenues();
  }

  @Post()
  create(@Body() createDto: Venue): Promise<Venue> {
    return this.srv.addVenue(createDto);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Venue> {
    return this.srv.getById(id);
  }

  @Patch()
  update(@Body() updateDto: Venue): Promise<Venue> {
    return this.srv.updateVenue(updateDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<DeleteVenueDto> {
    return this.srv.deleteById(id);
  }
}
