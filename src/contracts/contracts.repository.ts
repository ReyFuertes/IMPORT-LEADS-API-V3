import { ImagesRepository } from './../images/images.repository';
import { ContractTermRepository } from './../contract-term/contract-term.repository';
import { ContractCategoryRepository } from './../contract-category/contract-category.repository';
import { CategoryRepository } from './../category/category.repository';
import { GCDto, ReqCDto, ResCDto } from './contracts.dto';
import { sqlOp } from './../models/generic.model';
import { Contract } from './contracts.entity';
import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import * as _ from 'lodash';

@EntityRepository(Contract)
export class ContractsRepository extends Repository<Contract> {
  async createContractWithCategoryTerm(dto: ReqCDto): Promise<Contract> {
    /* create contract */
    const contract_result = await this.save(dto);
    
    /* create category */
    const category_repo = getCustomRepository(CategoryRepository);
    const category_result = await category_repo.save({
      category_name: 'Default category'
    });

    /* insert to contract category */
    const contract_category_repo = getCustomRepository(ContractCategoryRepository);
    const contract_category_query = contract_category_repo.createQueryBuilder('contract_category');

    let result: number = await contract_category_query
      .where("contract_id = :id", { id: contract_result.id })
      .getCount();

    const contract_category_result = await contract_category_repo.save({
      category: category_result,
      contract: contract_result,
      position: (result + 1)
    });

    /* insert category term */
    const term_repo = getCustomRepository(ContractTermRepository);
    await term_repo.save({
      contract_category: contract_category_result,
      term_name: 'Write term name here...',
      term_description: 'Write term description here...'
    });

    return contract_result;
  }

  /* update contract */
  async updateContract(dto: ReqCDto): Promise<Contract> {
    const result = await this.save(dto);
    /* insert images category */
    const image_repo = getCustomRepository(ImagesRepository);
    let count = await image_repo.count();

    dto.images.forEach(image => {
      count = count + 1;
      image.contract_id = result.id;
      image.position = count;
    });
    await image_repo.save(dto.images);

    return this.save(dto);
  }

  /** get all contracts **/
  async getContracts(dto?: GCDto): Promise<ResCDto> {
    const contracts = await this.fmt(dto);
    return contracts;
  }

  /** build contract query **/
  private async getQuery(dto?: any) {
    const query = this.createQueryBuilder('contract');
    _.mapValues(dto, _.method('toLowerCase')); // convert values to lowercases

    const page = Object.assign({}, {
      take: dto.take,
      skip: dto.skip
    });

    const orderBy = dto.orderby;
    const where = dto;

    delete where.skip;
    delete where.take;
    delete where.orderby;

    if (where && Object.keys(where)) {
      Object.entries(where).forEach(c => {
        //transform entries into object
        const obj = Object.assign({}, Object.entries(c)
          .reduce((acc, [k, v]) => ({ ...acc, [c[0]]: v }), {})
        );
        //note: im just using orWhere so every criteria will match the database
        let op: sqlOp = sqlOp.iLike;
        if (+(Object.values(obj)[0]) || (Object.keys(obj)[0]).includes('.id')) op = sqlOp.eq;

        query.orWhere(`${Object.keys(obj)} ${op} :${Object.keys(obj)}`, obj)
      });
    }

    query.leftJoinAndSelect('contract.venue', 'venue_id')
      .leftJoinAndSelect("contract.images", "image")
      .leftJoinAndSelect("contract.user", "user_id")
      .addOrderBy("image.position", "ASC")
      .skip(page.skip)
      .take(page.take);

    if (orderBy) {
      let r = orderBy.replace(/(\]\[)/, ']|[');
      r = r.split('|');
      let arr: any[] = [];
      r.forEach(_ => {
        const str = String(_).replace(/[\[\]']+/g, '')
        arr.push(str.split(','));
      });

      arr.forEach(q => {
        query.addOrderBy(q[0], q[1].toUpperCase());
      });
    } else {
      query.orderBy("contract.created_at", "DESC")
    }

    let results = await query;
    return results
  }

  /* format contract results */
  private async fmt(dto?: GCDto): Promise<ResCDto> {
    const results = await (await this.getQuery(dto)).getMany();

    return this.fmtResults(results);
  }
  
  /* delete contract */
  async deleteById(id: string): Promise<Contract> {
    const exist = await this.findOne({ id });
    if (exist) {
      await this.delete(id);
    }
    return exist
  }

  /* format results */
  private fmtResults = (results: any) => (results);
}


