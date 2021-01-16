import { VenueProductsDto } from './venue-products.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';
import { VenueProducts } from './venue-products.entity';
import { VenueProductsRepository } from './venue-products.repository';

@Injectable()
export class VenueProductsService extends BaseService<VenueProducts> {
  constructor(@InjectRepository(VenueProductsRepository) public repo: VenueProductsRepository) {
    super(repo);
  }

  async removeRelatedProduct(dto: VenueProductsDto): Promise<void> {
    return this.repo.removeRelatedProduct(dto)
  }
  
  async getAllVenues(): Promise<VenueProductsDto[]> {
    return this.repo.getAllVenues()
  }

  async addVenueProducts(IVenueDto: VenueProductsDto): Promise<VenueProductsDto> {
    return this.repo.addVenueProducts(IVenueDto);
  }
}
