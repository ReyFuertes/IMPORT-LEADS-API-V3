import { ReqVenueDto, DeleteVenueDto, IVenueDto } from './venues.dto';
import { VenuesRepository } from './venues.repository';
import { Venue } from './venues.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';

@Injectable()
export class VenuesService extends BaseService<Venue> {
  constructor(@InjectRepository(VenuesRepository) public repo: VenuesRepository,) {
    super(repo);
  }
  async getAllVenues(): Promise<IVenueDto[]> {
    return this.repo.getVenues()
  }
  async getById(id: string): Promise<Venue> {
    const venue = await this.repo.findOne(id);
    if (!venue) {
      throw new NotFoundException(`Venue with ID "${id}" not found`);
    }
    return venue;
  }

  async updateVenue(updateVenueDto: Venue): Promise<Venue> {
    return this.repo.saveVenue(updateVenueDto);
  }

  async addVenue(IVenueDto: Venue): Promise<Venue> {
    return this.repo.saveVenue(IVenueDto);
  }

  async deleteById(id: string): Promise<DeleteVenueDto> {
    return this.repo.deleteById(id);
  }

}
