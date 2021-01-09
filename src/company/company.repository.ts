import { Repository, EntityRepository, getCustomRepository, getRepository } from 'typeorm';
import * as _ from 'lodash';
import { Company } from './company.entity';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {

}

