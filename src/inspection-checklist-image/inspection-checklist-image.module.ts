import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { InspectionChecklistImageRepository } from './inspection-checklist-image.repository';
import { InspectionChecklistImageController } from './inspection-checklist-image.controller';
import { InspectionChecklistImageService } from './inspection-checklist-image.service';

@Module({
  imports: [TypeOrmModule.forFeature([InspectionChecklistImageRepository])],
  controllers: [InspectionChecklistImageController],
  providers: [InspectionChecklistImageService]
})
export class InspectionChecklistImageModule { }
