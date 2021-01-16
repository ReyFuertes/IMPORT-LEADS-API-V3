import { CategoryDto } from './category.dto';
import { CategoryRepository } from './category.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';
import { Category } from './category.entity';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(@InjectRepository(CategoryRepository) public repo: CategoryRepository) {
    super(repo);
  }

  async deleteById(id: string): Promise<CategoryDto> {
    return this.repo.deleteCategory(id);
  }

  async createCategory(dto: CategoryDto): Promise<Category> {
    return this.create(dto);
  }

  async getCategoryByContractId(id: string): Promise<CategoryDto[]> {
    return this.repo.getCategoryByContractId(id)
  }

  async updateCategory(dto: Category): Promise<Category> {
    return this.repo.save(dto);
  }
}
