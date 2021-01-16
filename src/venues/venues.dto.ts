import { Product } from '../products/products.entity';

export class IVenueDto {
  id?: string;
  name:string;
  avg_pass_fail?: string;
  contact?:string;
  contracts?:string;
  inspections?: string;
  location?: string;
  rating?: string;
  related_products?: Product[];
  contract_count?: number;
}

export class ReqVenueDto extends IVenueDto { }

export class ResVenueDto extends IVenueDto { }

export class DeleteVenueDto {
  id: string;
  name: string;
}