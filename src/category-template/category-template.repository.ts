import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import { CategoryTemplate } from './category-template.entity';

@EntityRepository(CategoryTemplate)
export class CategoryTemplateRepository extends Repository<any> {

  async getSavedCategorys(dto: any): Promise<any> {
    const query = this.createQueryBuilder('category_template');

    const results = await query
    .leftJoinAndSelect('category_template.category', 'category.category_template')
      .getMany();

    return results;
  }

  async saveCategoryTemplate(dto: any): Promise<CategoryTemplate> {
    const ret = await this.save(dto);
    return ret;
  }
}

