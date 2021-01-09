import { Module } from '@nestjs/common';
import { InspectionChecklistReportController } from './inspection-checklist-report.controller';
import { InspectionChecklistReportService } from './inspection-checklist-report.service';

@Module({
  imports: [],
  controllers: [InspectionChecklistReportController],
  providers: [InspectionChecklistReportService]
})
export class InspectionChecklistReportModule { }
