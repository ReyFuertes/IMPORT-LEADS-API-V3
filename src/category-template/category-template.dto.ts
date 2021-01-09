import { Category } from "src/category/category.entity";

export class CategoryTemplateDto {
  id?: string;
  title?: string;
  description?: string;
  Category?: Category;
}