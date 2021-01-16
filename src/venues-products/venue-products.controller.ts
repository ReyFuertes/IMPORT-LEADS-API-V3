import { VenueProductsDto } from './venue-products.dto';
import { Controller, Get, Delete, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { VenueProductsService } from './venue-products.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('venue-products')
export class VenueProductsController {
  constructor(private srv: VenueProductsService) { }

  @Patch('/remove')
  //@UseGuards(AuthGuard('jwt'))
  removeRelatedProduct(@Body() dto: VenueProductsDto): Promise<void> {
    return this.srv.removeRelatedProduct(dto);
  }

  @Get()
  getAll(): Promise<VenueProductsDto[]> {
    return this.srv.getAllVenues();
  }
}
