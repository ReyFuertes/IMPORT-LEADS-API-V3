import { UpdateVenueDto } from './dto/update-venue.dto';
import { CreateVenueDto } from './dto/create-venue.dto';
import { VenuesRepository } from './venues.repository';
import { GetVenuesDto } from './dto/get-venues-dto';
import { Venue } from './venues.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';

@Injectable()
export class VenuesService extends BaseService<Venue> {
  constructor(@InjectRepository(VenuesRepository) public venuesRepository: VenuesRepository) {
    super(venuesRepository);
  }
  async getAllVenues(getBorrowerFilterDto: GetVenuesDto): Promise<Venue[]> {
    return this.venuesRepository.getVenues(getBorrowerFilterDto)
  }
  async getById(id: string): Promise<Venue> {
    const venue = await this.get(id, ['venue']);
    if (!venue) {
      throw new NotFoundException(`Venue with ID "${id}" not found`);
    }
    return venue;
  }
  async createVenue(createVenueDto: CreateVenueDto): Promise<Venue> {
    return this.create(createVenueDto);
  }
  async updateVenue(updateVenueDto: UpdateVenueDto): Promise<Venue> {
    return this.update(updateVenueDto);
  }
  async deleteById(id: number): Promise<void> {
    await this.delete(id);
  }
}
