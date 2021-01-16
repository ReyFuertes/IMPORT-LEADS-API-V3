import { UploadService } from './../upload/upload.service';
import { VenuesService } from './venues.service';
import { Venue } from './venues.entity';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { ReqVenueDto, DeleteVenueDto, IVenueDto } from './venues.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('venues')
export class VenuesController {
  constructor(private srv: VenuesService) { }
  
  @Get()
  getAll(): Promise<IVenueDto[]> {
    return this.srv.getAllVenues();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createDto: Venue): Promise<Venue> {
    return this.srv.addVenue(createDto);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Venue> {
    return this.srv.getById(id);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  update(@Body() updateDto: Venue): Promise<Venue> {
    return this.srv.updateVenue(updateDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string): Promise<DeleteVenueDto> {
    return this.srv.deleteById(id);
  }
}
