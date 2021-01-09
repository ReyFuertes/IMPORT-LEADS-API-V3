import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { VenueProductsController } from './venue-products.controller';
import { VenueProductsService } from './venue-products.service';
import { VenueProductsRepository } from './venue-products.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VenueProductsRepository])],
  controllers: [VenueProductsController],
  providers: [VenueProductsService]
})
export class VenueProductsModule {}
