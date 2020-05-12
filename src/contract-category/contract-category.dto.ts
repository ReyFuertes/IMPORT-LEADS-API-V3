import { ContractTerm } from './../contract-term/contract-term.entity';
import { Contract } from './../contracts/contracts.entity';
import { Category } from "src/category/category.entity";

export class ContractCategoryDto {
  id?: string;
  category?: Category;
  contract: Contract;
  term?: ContractTerm;
}
