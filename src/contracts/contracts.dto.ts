import { ContractProduct } from './../contract-products/contract-products.entity';
import { Image } from './../images/image.entity';
import { GetDto } from './../models/generic.model';
import { Venue } from './../venues/venues.entity';
import { User } from "src/users/user.entity";

export class ContractDto {
  id?: string;
  contract_name?: string;
}
export class ResCDto extends ContractDto {
  company?: string;
  responsible_person?: string;
  position?: string;
  upload_date?: Date;
  user?: User;
  venue: Venue;
}
export class ReqCDto extends ContractDto {
  company?: string;
  responsible_person?: string;
  position?: string;
  upload_date?: Date;
  user?: User;
  venue?: Venue;
  images?: Image[];
}

export class GCDto extends GetDto { }