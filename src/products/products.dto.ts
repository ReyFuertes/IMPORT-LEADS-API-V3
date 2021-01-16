import { GetDto } from './../models/generic.model';
import { Product } from '../products/products.entity';

export class IProductDto {
  id?: string;
  product_name?: string;
  cost?: number;
  qty?: string;
  parent?: Product;
}

export class ResProdDto extends IProductDto {
  pos?: number;
}

export class ReqProdDto extends IProductDto {
  pos?: any;
}

export class GetProductsDto extends GetDto { }

