import { sqlOp } from './../models/generic.model';
import { Repository, EntityRepository } from 'typeorm';
import * as _ from 'lodash';
import { IAccessDto } from './access.dto';
import { Access } from './access.entity';

@EntityRepository(Access)
export class AccessRepository extends Repository<Access> {

  async getAllAccess(dto: any): Promise<IAccessDto[]> {
    const query = this.createQueryBuilder('access');
    _.mapValues(dto, _.method('toLowerCase')); /* convert values to lowercases */
    const where = dto;
    const page = Object.assign({}, {
      take: dto.take,
      skip: dto.skip
    });
    delete where.skip, where.take;

    if (where && Object.keys(where)) {
      Object.entries(where).forEach(c => {
        /* transform entries into object */
        const obj = Object.assign({}, Object.entries(c)
          .reduce((acc, [k, v]) => ({ ...acc, [c[0]]: v }), {})
        );
        /* note: im just using orWhere so every criteria will match the database */
        let op: sqlOp = sqlOp.iLike;
        if (+(Object.values(obj)[0])) op = sqlOp.eq;

        query.orWhere(`${Object.keys(obj)} ${op} :${Object.keys(obj)}`, obj)
      });
    }
    const results = await query
      .leftJoinAndSelect('access.parent', 'parent_id')
      .skip(page.skip).take(page.take)
      .getMany();
   
    return results;
  }
}

