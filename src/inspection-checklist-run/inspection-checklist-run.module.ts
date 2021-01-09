import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { InspectionChecklistRunRepository } from './inspection-checklist-run.repository';
import { InspectionChecklistRunController } from './inspection-checklist-run.controller';
import { InspectionChecklistRunService } from './inspection-checklist-run.service';

@Module({
  imports: [TypeOrmModule.forFeature([InspectionChecklistRunRepository])],
  controllers: [InspectionChecklistRunController],
  providers: [InspectionChecklistRunService]
})
export class InspectionChecklistRunModule { }
