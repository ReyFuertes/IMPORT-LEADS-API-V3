import { Tag } from './../tags/tags.entity';
import { ContractCategory } from './../contract-category/contract-category.entity';
export class ContractTermDto {
  id?: string;
  term_name: string;
  term_description?: string;
  contract_category: ContractCategory;
  tag?: Tag;
  contract_id?: string;
}
