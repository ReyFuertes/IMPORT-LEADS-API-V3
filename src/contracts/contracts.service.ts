import { ContractProductResponseDto } from './../contract-products/contract-product.dto';
import { Contract } from './contracts.entity';
import { ContractsRepository } from './contracts.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';
import { ReqCDto, GCDto, ResCDto } from './contracts.dto';

@Injectable()
export class ContractsService extends BaseService<Contract> {
  constructor(@InjectRepository(ContractsRepository) public repo: ContractsRepository) {
    super(repo);
  }

  async getContracts(dto: GCDto): Promise<ResCDto> {
    return this.repo.getContracts(dto);
  }

  async getById(id: string): Promise<Contract> {
    const contract = await this.get(id, ['venue']);
    if (!contract) {
      throw new NotFoundException(`Contract with ID "${id}" not found`);
    }
    return contract;
  }

  async createContract(dto: ReqCDto): Promise<Contract> {
    return this.repo.createContractWithCategoryTerm(dto);
  }

  async updateContract(dto: ReqCDto): Promise<Contract> {
    return this.repo.updateContract(dto);
  }

  async deleteById(id: string): Promise<Contract> {
    return this.repo.deleteById(id);
  }
}
