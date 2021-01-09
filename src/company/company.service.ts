import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from './../base.service';
import { Injectable } from '@nestjs/common';
import { Company } from './company.entity';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService extends BaseService<Company> {
  constructor(@InjectRepository(CompanyRepository) public repo: CompanyRepository) {
    super(repo);
  }
}