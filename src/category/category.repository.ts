import { CategoryDto } from './category.dto';
import { Repository, EntityRepository } from 'typeorm';
import { Category } from './category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {

  async deleteCategory(id: string): Promise<CategoryDto> {
    const exist = await this.findOne({ id });
    if (exist) {
      this.createQueryBuilder()
        .delete()
        .from(Category)
        .where("id = :id", { id })
        .execute();

      return exist;
    }
    return null;
  }

  async getCategoryByContractId(id: string): Promise<CategoryDto[]> {
    const exist = await this.find({ id });
    if (exist) {
      this.createQueryBuilder()
        .delete()
        .from(Category)
        .where("id = :id", { id })
        .execute();

      return exist;
    }
    return null;
  }
}