import { ISavedChecklistDto } from "src/saved-checklist/saved-checklist.dto";
export enum RunStatusType {
  paused = 1,
  stop = 0
}
export interface IInspectionChecklistRunDto {
  id?: string;
  checklist_item?: {
    id?: string;
    comment?: string;
    created_at?: string;
    // updated_at?: string;
    verification?: string;
  },
  contract_category?: {
    id?: string;
    category: any;
    created_at?: string;
    // updated_at?: string;
  },
  contract_product?: {
    child_id?: string;
    cost?: string;
    id: string;
    parent_id?: string;
    product: any;
    qty?: number;
    term_description?: string;
    created_at?: string;
    // updated_at?: string;
  }
  contract_term?: {
    id?: string;
    term_description?: string;
    term_name?: string;
  },
  saved_checklist?: {
    id?: string;
  }
}
export interface IInspectionRunDto {
  id?: string;
  saved_checklist?: ISavedChecklistDto;
  run_status?: string;
}