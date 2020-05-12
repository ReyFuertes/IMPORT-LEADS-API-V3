import { ReqCPDto, ResCPDto } from './contract-product.dto';
import { ContractProduct } from './contract-products.entity';
import { CPRepository } from './../contract-products/contract-products.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';

@Injectable()
export class CPService extends BaseService<ContractProduct> {
  constructor(@InjectRepository(CPRepository) public repo: CPRepository) {
    super(repo);
  }

  async saveContractProduct(dto: ReqCPDto): Promise<ResCPDto> {
    return this.repo.saveContractProduct(dto);
  }

  async getByContractId(id: string): Promise<ResCPDto[]> {
    return this.repo.getByContractId(id);
  }

  async deleteById(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
