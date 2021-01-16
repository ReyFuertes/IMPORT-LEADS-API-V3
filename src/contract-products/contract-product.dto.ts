import { ContractDto } from './../contracts/contracts.dto';
import { Contract } from './../contracts/contracts.entity';
import { Product } from "src/products/products.entity";
import { ContractChecklist } from '../contract-checklist/contract-checklist.entity';

export class ContractProductDto {
  id?: string;
  _id?: string;
  pos?: number;
}
export class SingleCPDto extends ContractProductDto {
  parent?: ContractProductDto;
  child?: ContractProductDto;
}
export class ContractProductResponseDto extends ContractProductDto {
  product_name?: string;
  qty?: any;
  cost?: any;
  contract?: ContractDto;
  sub_products?: Product[];
}
export class ReqCPDto extends ContractProductDto {
  parent?: ContractProductDto;
  contract?: ContractDto;
  children?: ContractProductDto[];
}
export interface IContractProduct {
  _id?: string;
  id: string;
  qty?: number;
  cost?: string;
  term_description?: string;
  child_id?: string;
  product_checklist?: ContractChecklist[];
  parent?: Product;
  child?: Product;
  contract?: Contract;
  created_at?: string;
  // updated_at?: number;
}