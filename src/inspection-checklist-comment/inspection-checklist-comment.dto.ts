import { InspectionChecklistRun } from "src/inspection-checklist-run/inspection-checklist-run.entity";
import { GetDto } from "src/models/generic.model";
import { ContractTerm } from "src/contract-term/contract-term.entity";
import { SavedChecklist } from "src/saved-checklist/saved-checklist.entity";
import { ContractCategory } from "src/contract-category/contract-category.entity";
import { ContractProduct } from "src/contract-products/contract-products.entity";

export enum InspectionVerificationType {
  ok = 'ok',
  failed = 'failed',
  comment = 'comment'
}

export interface IInspectionChecklistCommentDto {
  id?: string;
  verification?: string;
  comment?: string;
  inspection_checklist_run?: InspectionChecklistRun;
  contract_term?: ContractTerm;
  contract_category?: ContractCategory;
  contract_product?: ContractProduct;
  saved_checklist?: SavedChecklist;
}

export class GetInspectionChecklistCommentDto extends GetDto { }