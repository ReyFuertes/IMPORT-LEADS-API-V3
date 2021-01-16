import { GetDto } from '../models/generic.model';
import { ContractProduct } from '../contract-products/contract-products.entity';
import { ContractCategory } from '../contract-category/contract-category.entity';
import { ContractTerm } from '../contract-term/contract-term.entity';
import { IContractProduct } from '../contract-products/contract-product.dto';
import { IChecklistProduct } from '../contract-checklist/contract-checklist.dto';
import { ISavedChecklistDto } from '../saved-checklist/saved-checklist.dto';

export interface ISavedChecklistItemDto {
  id?: string;
  checklist_product?: IContractProduct;
  checklist_contract?: IChecklistProduct;
  checklist_term?: any;
  checklist_category?: any;
}
export interface ISavedChecklistItem {
  id?: string;
  saved_checklist?: ISavedChecklistDto;
  checklist_product?: ContractProduct;
  checklist_category?: ContractCategory;
  checklist_term?: ContractTerm;
}

export class GetSavedChecklistItemDto extends GetDto { }

