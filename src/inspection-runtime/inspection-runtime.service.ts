import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { InspectionRuntime } from './inspection-runtime.entity';
import { InspectionRuntimeRepository } from './inspection-runtime.repository';

@Injectable()
export class InspectionRuntimeService extends BaseService<InspectionRuntime> {
  constructor(@InjectRepository(InspectionRuntimeRepository) public repo: InspectionRuntimeRepository) {
    super(repo);
  }

  async changeStatus(dto: any): Promise<any> {
    return this.repo.changeStatus(dto);
  }
}
