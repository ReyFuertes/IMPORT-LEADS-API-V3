import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { InspectionChecklistCommentRepository } from './inspection-checklist-comment.repository';
import { InspectionChecklistCommentController } from './inspection-checklist-comment.controller';
import { InspectionChecklistCommentService } from './inspection-checklist-comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([InspectionChecklistCommentRepository])],
  controllers: [InspectionChecklistCommentController],
  providers: [InspectionChecklistCommentService]
})
export class InspectionChecklistCommentModule { }
