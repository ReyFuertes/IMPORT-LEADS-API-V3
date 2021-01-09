import { Venue } from 'src/venues/venues.entity';
import { Repository, EntityRepository, getRepository } from 'typeorm';
import { VenueProducts } from './venue-products.entity';
import { VenueProductsDto } from './venue-products.dto';

@EntityRepository(VenueProducts)
export class VenueProductsRepository extends Repository<VenueProducts> {

  async removeRelatedProduct(dto: VenueProductsDto): Promise<void> {
    const exist = (await this.find({ id: dto.id })).shift();
    if (exist) {
      exist.product = null;
      await this.save(exist);
    }
  }

  async getAllVenues(): Promise<VenueProducts[]> {
    const query = this.createQueryBuilder('venue_product');

    const venue_products = await query
      .leftJoinAndSelect('venue_product.venue', 'venue')
      .leftJoinAndSelect('venue_product.product', 'product')
      .getMany();

    return venue_products;
  }

  async addVenueProducts(dto: VenueProductsDto): Promise<VenueProductsDto> {
    return this.save(dto);
  }
}