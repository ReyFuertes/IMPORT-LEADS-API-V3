import { GetDto } from "src/models/generic.model";
import { IAccessDto } from "src/access/access.dto";

export interface IUserAccessDto {
  id?: string;
  user?: { id: string };
  access?: IAccessDto;
}

export class GetUserAccesDto extends GetDto { }