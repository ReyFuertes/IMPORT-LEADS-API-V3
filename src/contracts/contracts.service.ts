import { ResCPDto } from './../contract-products/contract-product.dto';
import { Contract } from './contracts.entity';
import { ContractsRepository } from './contracts.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { ReqCDto, GCDto, ResCDto } from './contracts.dto';

@Injectable()
export class ContractsService extends BaseService<Contract> {
  constructor(@InjectRepository(ContractsRepository) public contractsRepository: ContractsRepository) {
    super(contractsRepository);
  }

  async getContracts(dto: GCDto): Promise<ResCDto> {
    return this.contractsRepository.getContracts(dto);
  }

  async getById(id: string): Promise<Contract> {
    const contract = await this.get(id, ['venue']);
    if (!contract) {
      throw new NotFoundException(`Contract with ID "${id}" not found`);
    }
    return contract;
  }

  async createContract(dto: ReqCDto): Promise<Contract> {
    return this.create(dto);
  }

  async updateContract(dto: ReqCDto): Promise<Contract> {
    return this.contractsRepository.updateContract(dto);
  }

  async deleteById(id: number): Promise<void> {
    this.delete(id);
  }
}
