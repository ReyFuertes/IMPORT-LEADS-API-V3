import { GetDto } from "src/models/generic.model";
export interface IInspectionChecklistImageDto {
  id?: string;
  image?: any;
  filename?: string;
  position?: number;
  file?: File;
  size?: any;
  mimetype?: string;
  inspection_checklist_run?: { id: string }
  contract_term?: { id: string }
}
export class GetInspectionChecklistImageDto extends GetDto { }