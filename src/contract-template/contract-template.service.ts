import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { ContractTemplate } from './contract-template.entity';
import { ContractTemplateRepository } from './contract-template.repository';

@Injectable()
export class ContractTemplateService extends BaseService<ContractTemplate> {
  constructor(@InjectRepository(ContractTemplateRepository) public repo: ContractTemplateRepository) {
    super(repo);
  }

  async import(dto: any): Promise<any> {
    return this.repo.import(dto);
  }

  async getSavedContracts(dto: any): Promise<ContractTemplate> {
    return this.repo.getSavedContracts(dto);
  }

  async saveContractTemplate(dto: any): Promise<ContractTemplate> {
    return this.repo.saveContractTemplate(dto);
  }
  
}
