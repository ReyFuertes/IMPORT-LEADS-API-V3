import { ContractTermDto } from './contract-term.dto';
import { ContractTermRepository } from './contract-term.repository';
import { ContractTerm } from './contract-term.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';

@Injectable()
export class ContractTermService extends BaseService<ContractTerm> {
  constructor(@InjectRepository(ContractTermRepository) public repo: ContractTermRepository) {
    super(repo);
  }

  async updateTerm(dto: ContractTermDto): Promise<ContractTermDto> {
    return this.repo.saveTerm(dto);
  }

  async deleteById(id: string): Promise<ContractTermDto> {
    return this.repo.deleteTerm(id);
  }

  async createTerm(dto: ContractTermDto): Promise<ContractTermDto> {
    return this.repo.saveTerm(dto);
  }
}
