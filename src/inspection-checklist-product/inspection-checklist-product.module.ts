import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { InspectionChecklistProductRepository } from './inspection-checklist-product.repository';
import { InspectionChecklistProductController } from './inspection-checklist-product.controller';
import { InspectionChecklistProductService } from './inspection-checklist-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([InspectionChecklistProductRepository])],
  controllers: [InspectionChecklistProductController],
  providers: [InspectionChecklistProductService]
})
export class InspectionChecklistProductModule { }
