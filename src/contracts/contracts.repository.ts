import { GCDto, ReqCDto, ResCDto } from './contracts.dto';
import { sqlOp } from './../models/generic.model';
import { Contract } from './contracts.entity';
import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import _ = require("lodash");

@EntityRepository(Contract)
export class ContractsRepository extends Repository<Contract> {
  async updateContract(dto: ReqCDto): Promise<Contract> {
    return this.save(dto);
  }

  async getContract(id: string): Promise<Contract> {
    let result = await (await this.getQuery())
      .where('contract.id = :id', { id })
      .getOne();

    return null;// this.group(Object.assign({}, result.contract_products));
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
    const where = dto;
    delete where.skip, where.take;

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

    return await (query
      .leftJoinAndSelect('contract.venue', 'venue_id')
      .leftJoinAndSelect("contract.images", "image")
      .leftJoinAndSelect("contract.user", "user_id")
      .orderBy("contract.id", "DESC")
      .addOrderBy("image.position", "ASC"))
      .skip(page.skip)
      .take(page.take)
  }

  /* format contract results */
  private async fmt(dto?: GCDto): Promise<ResCDto> {
    const results = await (await this.getQuery(dto)).getMany();
    return this.fmtResults(results);
  }
  private fmtResults = (results: any) => (results);
}


