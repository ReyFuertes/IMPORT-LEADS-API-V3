import { Contract } from './../contracts/contracts.entity';

export class CategoryDto {
  id?: string;
  category_name?: string;
}
export class ContractCategoryDto {
  category: CategoryDto;
  contract: Contract;
}