import { ContractDto } from './../contracts/contracts.dto';
import { Contract } from './../contracts/contracts.entity';
import { Product } from "src/products/products.entity";

export class ContractProductDto {
  id?: string;
  _id?: string;
  pos?: number;
}

export class SingleCPDto extends ContractProductDto {
  parent?: ContractProductDto;
  child?: ContractProductDto;
}
export class ResCPDto extends ContractProductDto {
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