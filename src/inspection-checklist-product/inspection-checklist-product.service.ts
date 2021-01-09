import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { InspectionChecklistProduct } from './inspection-checklist-product.entity';
import { InspectionChecklistProductRepository } from './inspection-checklist-product.repository';

@Injectable()
export class InspectionChecklistProductService extends BaseService<InspectionChecklistProduct> {
  constructor(@InjectRepository(InspectionChecklistProductRepository) public repo: InspectionChecklistProductRepository) {
    super(repo);
  }
}
