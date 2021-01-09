import { Image } from './../images/image.entity';
import { GetDto } from './../models/generic.model';
import { Venue } from './../venues/venues.entity';
import { User } from 'src/user/user.entity';

export class ContractDto {
  id?: string;
  contract_name?: string;
  venue?: Venue;
  user?: User;
  company?: string;
  responsible_person?: string;
  position?: string;
  upload_date?: Date;
  contract_count?: string;
  venue_id?: string;
}
export class ResCDto extends ContractDto { }
export class ReqCDto extends ContractDto {
  images?: Image[];
}

export class GCDto extends GetDto { }