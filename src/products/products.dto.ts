import { GetDto } from './../models/generic.model';
import { Product } from 'src/products/products.entity';

export class ProductDto {
  id?: string;
  product_name?: string;
  cost?: number;
  qty?: string;
  parent?: Product;
}

export class ResProdDto extends ProductDto {
  pos?: number;
}

export class ReqProdDto extends ProductDto {
  pos?: any;
}

export class GetProductsDto extends GetDto { }

