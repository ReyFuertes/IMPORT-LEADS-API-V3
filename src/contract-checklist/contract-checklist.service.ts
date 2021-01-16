import { IChecklistDto, IChecklistProdArrDto, GetChecklistDto, ReContractChecklistDto, OverrideChecklistItemDto } from './contract-checklist.dto';
import { ContractChecklistRepository } from './contract-checklist.repository';
import { ContractChecklist } from './contract-checklist.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';

@Injectable()
export class ContractChecklistService extends BaseService<ContractChecklist> {
  constructor(@InjectRepository(ContractChecklistRepository) public repo: ContractChecklistRepository) {
    super(repo);
  }

  // async applyChanges(dto: OverrideChecklistItemDto): Promise<IChecklistDto[]> {
  //   return this.repo.override(dto);
  // }

  // async override(dto: OverrideChecklistItemDto): Promise<IChecklistDto[]> {
  //   return this.repo.override(dto);
  // }

  // async deleteById(id: string): Promise<ContractChecklist> {
  //   return this.repo.deleteById(id);
  // }

  // async getChecklists(dto: GetChecklistDto): Promise<IChecklistDto[]> {
  //   return this.repo.getChecklists(dto);
  // }

  // async saveChecklist(dto: IChecklistProdArrDto): Promise<IChecklistDto[]> {
  //   return this.repo.saveChecklist(dto);
  // }

  // async multipleDelete(dto: IChecklistProdArrDto[]): Promise<IChecklistDto[]> {
  //   return this.repo.multipleDelete(dto);
  // }
}
