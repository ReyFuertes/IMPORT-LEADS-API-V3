import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';
import { InspectionChecklistComment } from './inspection-checklist-comment.entity';
import { InspectionChecklistCommentRepository } from './inspection-checklist-comment.repository';
import { IInspectionChecklistCommentDto } from './inspection-checklist-comment.dto';

@Injectable()
export class InspectionChecklistCommentService extends BaseService<InspectionChecklistComment> {
  constructor(@InjectRepository(InspectionChecklistCommentRepository) public repo: InspectionChecklistCommentRepository) {
    super(repo);
  }

  async updateChecklist(dto: IInspectionChecklistCommentDto): Promise<IInspectionChecklistCommentDto> {
    return this.repo.updateChecklist(dto);
  }

  async deleteById(id: string): Promise<void> {
    return this.repo.deleteById(id);
  }

  async getChecklists(id: string): Promise<IInspectionChecklistCommentDto[]> {
    return this.repo.getChecklists(id);
  }

  async saveChecklist(dto: IInspectionChecklistCommentDto): Promise<IInspectionChecklistCommentDto> {
    return this.repo.saveChecklist(dto);
  }
}
