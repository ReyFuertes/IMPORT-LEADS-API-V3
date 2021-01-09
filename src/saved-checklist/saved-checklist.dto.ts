import { GetDto } from '../models/generic.model';
import { IUserDto } from 'src/user/user.dto';

export class ISavedChecklistDto {
  id?: string;
  checklist_name?: string;
  assigned_to?: { id: string, username: string };
  desired_run_date?: string;
  checklist_items?: any[];
  checklist_contract?: { id: string };
  user?: IUserDto;
  created_at?: string;
  // updated_at?: string;
}

export class GetSavedChecklistDto extends GetDto { }

