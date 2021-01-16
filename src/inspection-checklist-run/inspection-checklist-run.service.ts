import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';
import { InspectionChecklistRun } from './inspection-checklist-run.entity';
import { InspectionChecklistRunRepository } from './inspection-checklist-run.repository';
import { IInspectionChecklistRunDto, IInspectionRunDto } from './inspection-checklist-run.dto';

@Injectable()
export class InspectionChecklistRunService extends BaseService<InspectionChecklistRun> {
  constructor(@InjectRepository(InspectionChecklistRunRepository) public repo: InspectionChecklistRunRepository) {
    super(repo);
  }

  async deleteById(id: string): Promise<void> {
    return this.repo.deleteById(id);
  }

  async navigateTo(dto: { saved_checklist_id: string, position: number }): Promise<IInspectionChecklistRunDto> {
    return this.repo.navigateTo(dto);
  }

  async copy(dto: { id: string, copyCount: number, contractProductId: string }): Promise<string> {
    return this.repo.copy(dto);
  }

  async removeAndNavigateTo(dto: { id: string }): Promise<IInspectionRunDto> {
    return this.repo.removeAndNavigateTo(dto);
  }

  async prev(dto: any): Promise<IInspectionChecklistRunDto[]> {
    return this.repo.prev(dto);
  }

  async next(dto: any): Promise<IInspectionChecklistRunDto[]> {
    return this.repo.next(dto);
  }

  async getInspectionsRunById(id: string): Promise<IInspectionChecklistRunDto[]> {
    return this.repo.getInspectionsRunById(id);
  }

  async run(dto: IInspectionRunDto): Promise<IInspectionRunDto> {
    return this.repo.run(dto);
  }
}
