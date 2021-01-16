import { ContractDto } from './../contracts/contracts.dto';
import { GetDto } from './../models/generic.model';
import { Contract } from './../contracts/contracts.entity';
import { ContractCategory } from './../contract-category/contract-category.entity';
import { ContractProduct } from './../contract-products/contract-products.entity';
import { ContractTerm } from '../contract-term/contract-term.entity';
import { IProductDto } from '../products/products.dto';
import { IContractProduct } from '../contract-products/contract-product.dto';
export interface OverrideChecklistItemDto {
  source: IChecklistDto;
  destination: IChecklistDto;
}
export class ReContractChecklistDto {
  id?: string;
  checklist_contract: ContractDto
}
export class GetChecklistDto extends GetDto { }
export interface IChecklistProdArrDto extends IChecklist {
  checklist_product?: IChecklistProduct[];
}
export interface IChecklistProduct {
  id?: string;
  product?: { id: string, product: IProductDto},
}
export interface IChecklistDto extends IChecklist {
  checklist_product?: {
    id?: string;
    product?: IProductDto,
  };
}
export interface IChecklist {
  id?: string;
  checklist_contract?: { id?: string, contract_name?: string};
  checklist_category?: ContractCategory;
  checklist_term?: ContractTerm;
  // checklist_name?: string;
  // desired_run_date?: string;
  // assigned_to?: string;
  created_at?: string;
  // updated_at?: number;
}