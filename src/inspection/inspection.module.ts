
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { InspectionRepository } from './inspection.repository';
import { InspectionController } from './inspection.controller';
import { InspectionService } from './inspection.service';

@Module({
  imports: [TypeOrmModule.forFeature([InspectionRepository])],
  controllers: [InspectionController],
  providers: [InspectionService]
})
export class InspectionModule { }
