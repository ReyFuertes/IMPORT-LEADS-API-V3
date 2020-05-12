import { Venue } from 'src/venues/venues.entity';
import { GetVenuesDto } from './dto/get-venues-dto';
import { sqlOp } from './../models/generic.model';
import { Repository, EntityRepository } from 'typeorm';
import _ = require("lodash");

@EntityRepository(Venue)
export class VenuesRepository extends Repository<Venue> {
  async getVenues(getVenueFilterDto: GetVenuesDto): Promise<Venue[]> {
    const query = this.createQueryBuilder('venue');
    return query.getMany();
  }
}