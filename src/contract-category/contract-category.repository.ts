import { ContractTermRepository } from './../contract-term/contract-term.repository';
import { CategoryRepository } from './../category/category.repository';
import { ContractCategoryDto } from './contract-category.dto';
import { ContractCategory } from './contract-category.entity';
import { Repository, EntityRepository, getCustomRepository, getRepository } from 'typeorm';
import { ContractTerm } from 'src/contract-term/contract-term.entity';
import * as _ from 'lodash';

@EntityRepository(ContractCategory)
export class ContractCategoryRepository extends Repository<ContractCategory> {

  async saveMultiple(dto: ContractCategoryDto[]): Promise<ContractCategoryDto[]> {
    const payload = dto.map(c => {
      return {
        category: c.category,
        contract: c.contract,
        position: 0
      }
    });
    const results = await this.save(payload);

    return results;
  }

  async getAllContractCategories(dto: any): Promise<any> {
    const query = this.createQueryBuilder('contract_category')
    const results = await query
      .leftJoinAndSelect('contract_category.category', 'category')
      .leftJoinAndSelect('contract_category.contract', 'contract')
      .leftJoinAndSelect('contract_category.terms', 'contract_term')
      .orderBy("contract_category.position", "DESC")
      .getMany();

    /* get term by only category ids */
    let termIds = results && results
      .map(c => c.terms.map(t => {
        return (t && t.id) ? t.id : null;
      }));
    termIds = _.flatten(termIds)

    let terms_with_tags: string[] = [];
    if (termIds && termIds.length > 0) {
      terms_with_tags = await this.getTermById(termIds);
    }

    /* construct terms with tags */
    let newResults: any[];
    await new Promise((resolve) => {
      results.forEach(async result => {
        result.terms = await this.getTermTag(terms_with_tags, result.terms)
      });
      newResults = results;
      resolve(newResults);
    });

    return newResults;
  }

  async moveDown(dto: any): Promise<ContractCategoryDto> {
    const contract_category_query = this.createQueryBuilder('contract_category');

    let data_results: any = await contract_category_query
      .where("contract_id = :id", { id: dto.contract.id })
      .orderBy("position", "DESC")
      .getMany();

    const results: any[] = await contract_category_query
      .select('id, position')
      .addSelect('row_number() OVER (ORDER BY "position" DESC)')
      .where("contract_id = :id", { id: dto.contract.id })
      .getRawMany();

    let record = results.filter(r => r.id === dto.id).shift();

    let nextRow = Number(record.row_number) + 1;
    let nextRecord = results.filter(r => Number(r.row_number) === Number(nextRow)).shift()

    data_results.forEach(_ => {
      if (_.id === record.id) {
        _.position = nextRecord.position;
      } else if (_.id == nextRecord.id) {
        _.position = record.position;
      }
    });

    const ret = await this.save(data_results);
    return ret;
  }

  async moveUp(dto: any): Promise<ContractCategoryDto> {
    const contract_category_query = this.createQueryBuilder('contract_category');

    let data_results: any = await contract_category_query
      .where("contract_id = :id", { id: dto.contract.id })
      .orderBy("position", "DESC")
      .getMany();

    const results: any[] = await contract_category_query
      .select('id, position')
      .addSelect('row_number() OVER (ORDER BY "position" DESC)')
      .where("contract_id = :id", { id: dto.contract.id })
      .getRawMany();

    let record = results.filter(r => r.id === dto.id).shift();

    let prevRow = Number(record.row_number) - 1;
    let prevRecord = results.filter(r => Number(r.row_number) === Number(prevRow)).shift();

    data_results.forEach(_ => {
      if (_.id === record.id) {
        _.position = prevRecord.position;
      } else if (_.id == prevRecord.id) {
        _.position = record.position;
      }
    });

    const ret = await this.save(data_results);
    return ret;
  }

  async createContractTerm(dto: ContractCategoryDto): Promise<ContractCategoryDto> {
    const { id, category, term, contract } = dto;

    /* insert to category first */
    const term_repo = getCustomRepository(ContractTermRepository);
    const term_result = await term_repo.save(term);

    const payload = {
      id,
      term: term_result
    }

    /* insert to contract category */
    const cc_result = await this.save(payload);

    return cc_result;
  }

  async deleteById(id: string): Promise<ContractCategoryDto> {
    const exist = await this.findOne({ id });
    if (exist) {
      await this.delete(id);
    }
    return exist
  }

  async getByContractId(id: string): Promise<any[]> {
    const query = this.createQueryBuilder('contract_category')
    const results = await query
      .leftJoinAndSelect('contract_category.category', 'category')
      .leftJoinAndSelect('contract_category.contract', 'contract')
      .leftJoinAndSelect('contract_category.terms', 'contract_term')
      .where('contract_category.contract_id = :id', { id })
      .orderBy("contract_category.position", "DESC")
      .getMany();

    /* get term by only category ids */
    let termIds = results && results
      .map(c => c.terms.map(t => {
        return (t && t.id) ? t.id : null;
      }));
    termIds = _.flatten(termIds)

    let terms_with_tags: string[] = [];
    if (termIds && termIds.length > 0) {
      terms_with_tags = await this.getTermById(termIds);
    }

    /* construct terms with tags */
    let newResults: any[];
    await new Promise((resolve) => {
      results.forEach(async result => {
        result.terms = await this.getTermTag(terms_with_tags, result.terms)
      });
      newResults = results;
      resolve(newResults);
    });

    return newResults;
  }

  async getTermTag(terms_with_tags: any[], result_terms: any[]): Promise<ContractTerm[]> {
    let newTerms: any[] = [];
    result_terms.forEach(term => {
      terms_with_tags.forEach(term_tag => {
        if (term.id === term_tag.id) {
          newTerms.push(term_tag);
          return;
        }
      });
    });
    /* if no newTerms then just return the previous result terms */
    return newTerms && newTerms.length > 0 ? newTerms : result_terms;
  }

  async getTermById(ids: any[]): Promise<any> {
    const qb = getRepository(ContractTerm);
    const _query = await qb.createQueryBuilder('contract_term')
    const contract_terms = await _query
      .leftJoinAndSelect('contract_term.contract_tag', 'tag')
      .where('contract_term.id IN (:...ids)', { ids })
      .getMany();

    return contract_terms
  }

  async saveContractCategory(dto: ContractCategoryDto): Promise<ContractCategoryDto> {
    const { category, contract } = dto;

    const repo = getCustomRepository(CategoryRepository);
    const res = await repo.save(category);

    const contract_category_query = this.createQueryBuilder('contract_category');

    let result: number = await contract_category_query.where("contract_id = :id", { id: contract.id })
      .getCount();

    const results = await this.save({
      category: res,
      contract,
      position: (result + 1)
    });
    return results;
  }
}

