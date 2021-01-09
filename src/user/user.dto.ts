import { IUserProfileDto } from "src/user-profile/user-profile.dto";
import { GetDto } from "src/models/generic.model";
import { IUserAccessDto } from "src/user-access/user-access.dto";
import { IUserRoleDto } from "src/user-role/user-role.dto";

export interface IUserDto {
  id?: string;
  username?: string;
  password?: string;
  salt?: string;
  user_profile?: IUserProfileDto;
  user_access?: IUserAccessDto[];
  user_role?: IUserRoleDto[]
}
export class GetUserDto extends GetDto { }