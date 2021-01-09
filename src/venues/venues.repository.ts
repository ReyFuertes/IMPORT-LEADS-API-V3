import { ImagesRepository } from './../images/images.repository';
import { UploadRepository } from './../upload/upload.repository';
import { ContractDto } from './../contracts/contracts.dto';
import { Contract } from './../contracts/contracts.entity';
import { Venue } from 'src/venues/venues.entity';
import { Repository, EntityRepository, getRepository, getCustomRepository } from 'typeorm';
import { DeleteVenueDto, IVenueDto } from './venues.dto';
import { VenueProducts } from 'src/venues-products/venue-products.entity';

@EntityRepository(Venue)
export class VenuesRepository extends Repository<Venue> {
  async getVenues(): Promise<IVenueDto[]> {
    /* add pagination later */
    const query = this.createQueryBuilder('venue');
    const venues = await query.leftJoinAndSelect("venue.image", "image").getMany();

    /* get venue products */
    const vp_repo = getRepository(VenueProducts);
    const vp_query = vp_repo.createQueryBuilder('venue_products');
    const vp_results = await vp_query
      .leftJoinAndSelect('venue_products.venue', 'venue')
      .leftJoinAndSelect('venue_products.product', 'product')
      .getMany();

    /* get the contract and select venue */
    const contract_repo = getRepository(Contract);
    const contract_query = contract_repo.createQueryBuilder('contract');
    const contract_results = await contract_query
      .leftJoinAndSelect('contract.venue', 'venue')
      .select('contract.venue')
      .getRawMany();

    /* process results */
    return this.processResults(venues, vp_results, contract_results);
  }

  async processResults(venues: Venue[], vp_results: VenueProducts[], contract_results: ContractDto[]): Promise<IVenueDto[]> {
    let venuesArr: IVenueDto[] = [];
    venues.forEach(async venue => {
      let venueObj: IVenueDto;
      let products: any[] = [];

      vp_results.forEach(venue_products => {
        if (venue.id === venue_products.venue.id) {
          if (venue_products.product) {
            products.push({
              ...venue_products.product,
              _id: venue_products.id
            });
          } else return;
        }
      });
      venueObj = venue;
      venueObj.related_products = products;
      venueObj.contract_count = contract_results.filter(c => c.venue_id === venue.id).length || null;
      venuesArr.push(venueObj);
    });
    return venuesArr;
  }

  async deleteById(id: string): Promise<DeleteVenueDto> {
    const exist = await this.findOne({ id });
    if (exist) {
      this.createQueryBuilder()
        .delete()
        .from(Venue)
        .where("id = :id", { id })
        .execute();

      const deletedVenue: DeleteVenueDto = {
        id: exist.id,
        name: exist.name
      }
      return deletedVenue;
    }
    return null;
  }

  async saveVenue(dto: Venue): Promise<Venue> {
    const venue_payload = { ...dto }
    delete venue_payload.image;
    const result = await this.save(venue_payload);

    /* insert images category */
    const image_repo = getCustomRepository(ImagesRepository);
    const payload = {
      ...dto.image,
      venue_id: result.id
    }
    delete payload['image'];
  
    const image = await image_repo.save(payload);
    result.image = image;

    return result;
  }
}