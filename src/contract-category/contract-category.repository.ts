import { ContractTermDto } from './../contract-term/contract-term.dto';
import { TagRepository } from './../tags/tags.repository';
import { ContractTermRepository } from './../contract-term/contract-term.repository';
import { CategoryRepository } from './../category/category.repository';
import { ContractCategoryDto } from './contract-category.dto';
import { ContractCategory } from './contract-category.entity';
import { Repository, EntityRepository, getCustomRepository, getRepository } from 'typeorm';
import { ContractTerm } from 'src/contract-term/contract-term.entity';

@EntityRepository(ContractCategory)
export class ContractCategoryRepository extends Repository<ContractCategory> {
  async createContractTerm(dto: ContractCategoryDto): Promise<ContractCategoryDto> {
    const { id, category, term, contract } = dto;

    /* insert to category first */
    const t_repo = getCustomRepository(ContractTermRepository);
    const t_result = await t_repo.save(term);

    const payload = {
      id,
      term: t_result
    }
    console.log(payload);
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
      .getMany();
    console.log(results);
    /* get term by category ids */
    const categoryIds = results && results.map(c => c && c.terms.map(t => t && t.id)).shift();
    if (!categoryIds) {
      return [];
    }
    let terms_with_tags = await this.getTermById(categoryIds);
  
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
    return newTerms;
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
    /* insert to category first */
    const cr = getCustomRepository(CategoryRepository);
    const c_result = await cr.save(category);
    /* insert to contract category */
    const cc_result = await this.save({
      category: c_result,
      contract
    });
    return cc_result;
  }
}

