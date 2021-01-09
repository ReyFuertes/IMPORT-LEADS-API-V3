import { Contract } from "src/contracts/contracts.entity";

export class ContractTemplateDto {
  id?: string;
  title?: string;
  description?: string;
  contract?: Contract;
}