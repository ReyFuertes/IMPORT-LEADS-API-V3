import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { InspectionRepository } from './inspection.repository';
import { Inspection } from './inspection.entity';
import { GetInspectionDto } from './inspection.dto';

@Injectable()
export class InspectionService extends BaseService<Inspection> {
  constructor(@InjectRepository(InspectionRepository) public repo: InspectionRepository) {
    super(repo);
  }

  async getFinishedInspection(dto: any): Promise<any> {
    return this.repo.getFinishedInspection(dto);
  }

  async finishInspection(dto: any): Promise<void> {
    return this.repo.finishInspection(dto);
  }

  async deleteById(id: string): Promise<void> {
    return this.repo.deleteById(id);
  }

  async getActiveInspection(dto: GetInspectionDto): Promise<any> {
    return this.repo.getActiveInspection(dto)
  }
}
