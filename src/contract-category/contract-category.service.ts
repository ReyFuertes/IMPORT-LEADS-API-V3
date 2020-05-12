import { ContractCategoryDto } from './contract-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractCategoryRepository } from './contract-category.repository';
import { ContractCategory } from './contract-category.entity';
import { BaseService } from './../base.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContractCategoryService extends BaseService<ContractCategory> {
  constructor(@InjectRepository(ContractCategoryRepository) public repo: ContractCategoryRepository) {
    super(repo);
  }

  async saveContractCategory(dto: ContractCategoryDto): Promise<ContractCategoryDto> {
    return this.repo.saveContractCategory(dto);
  }

  async createContractTerm(dto: ContractCategoryDto): Promise<ContractCategoryDto> {
    return this.repo.createContractTerm(dto);
  }

  async deleteById(id: string): Promise<ContractCategoryDto> {
    return this.repo.deleteById(id);
  }

  async getByContractId(id: string): Promise<any[]> {
    return this.repo.getByContractId(id);
  }

  async createContractCategory(dto: ContractCategoryDto): Promise<ContractCategoryDto> {
    return this.repo.saveContractCategory(dto);
  }
}