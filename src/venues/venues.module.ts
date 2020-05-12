import { VenuesService } from './venues.service';
import { VenuesRepository } from './venues.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { VenuesController } from './venues.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VenuesRepository])],
  controllers: [VenuesController],
  providers: [VenuesService]
})
export class VenuesModule {}
