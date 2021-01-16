import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';
import { InspectionChecklistImage } from './inspection-checklist-image.entity';
import { InspectionChecklistImageRepository } from './inspection-checklist-image.repository';
import { GetInspectionChecklistImageDto, IInspectionChecklistImageDto } from './inspection-checklist-image.dto';

@Injectable()
export class InspectionChecklistImageService extends BaseService<InspectionChecklistImage> {
  constructor(@InjectRepository(InspectionChecklistImageRepository) public repo: InspectionChecklistImageRepository) {
    super(repo);
  }

  async deleteById(id: string): Promise<IInspectionChecklistImageDto> {
    return this.repo.deleteById(id);
  }

  async saveInsImage(dto: IInspectionChecklistImageDto[]): Promise<IInspectionChecklistImageDto[]> {
    return this.repo.saveInsImage(dto);
  }

}
