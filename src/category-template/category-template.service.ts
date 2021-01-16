import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';
import { CategoryTemplate } from './category-template.entity';
import { CategoryTemplateRepository } from './category-template.repository';

@Injectable()
export class CategoryTemplateService extends BaseService<CategoryTemplate> {
  constructor(@InjectRepository(CategoryTemplateRepository) public repo: CategoryTemplateRepository) {
    super(repo);
  }

  async getSavedCategorys(dto: any): Promise<CategoryTemplate> {
    return this.repo.getSavedCategorys(dto);
  }

  async saveCategoryTemplate(dto: any): Promise<CategoryTemplate> {
    return this.repo.saveCategoryTemplate(dto);
  }
  
}
