import { VenueProductsDto } from './venue-products.dto';
import { VenueProducts } from 'src/venues-products/venue-products.entity';

import { Controller, Get, Delete, Param, Patch, Body } from '@nestjs/common';
import { VenueProductsService } from './venue-products.service';

@Controller('venue-products')
export class VenueProductsController {
  constructor(private srv: VenueProductsService) { }

  @Patch('/remove')
  removeRelatedProduct(@Body() dto: VenueProductsDto): Promise<void> {
    return this.srv.removeRelatedProduct(dto);
  }

  @Get()
  getAll(): Promise<VenueProductsDto[]> {
    return this.srv.getAllVenues();
  }
}
