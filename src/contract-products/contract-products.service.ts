import { ReqCPDto, ContractProductResponseDto } from './contract-product.dto';
import { ContractProduct } from './contract-products.entity';
import { ContractProductRepository } from './../contract-products/contract-products.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';

@Injectable()
export class CPService extends BaseService<ContractProduct> {
  constructor(@InjectRepository(ContractProductRepository) public repo: ContractProductRepository) {
    super(repo);
  }

  async saveContractProduct(dto: ReqCPDto): Promise<ContractProductResponseDto> {
    return this.repo.saveContractProduct(dto);
  }

  async getByContractId(id: string): Promise<ContractProductResponseDto[]> {
    return this.repo.getByContractId(id);
  }

  async deleteById(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
