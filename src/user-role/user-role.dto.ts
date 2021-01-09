import { GetDto } from "src/models/generic.model";
import { IRoleDto } from "src/role/role.dto";
import { IUserDto } from "src/user/user.dto";

export interface IUserRoleDto {
  id?: string;
  role?: IRoleDto;
  user?: IUserDto
}

export class GetUserRoleDto extends GetDto { }