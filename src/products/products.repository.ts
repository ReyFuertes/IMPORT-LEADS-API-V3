import { Product } from './products.entity';
import { ReqProdDto, ResProdDto, } from './products.dto';
import { sqlOp } from './../models/generic.model';
import { Repository, EntityRepository } from 'typeorm';
import * as _ from 'lodash';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  async updateProduct(item: ReqProdDto): Promise<ResProdDto> {
    let parent: ReqProdDto;

    /* when updating item via parent */
    if (item && item.parent) {
      parent = await this.findOne({ id: item.parent.id });
      const childs = await this.find({ parent: item.parent });
      const maxPos = childs && childs.length > 0
        ? Number(Math.max(...childs.map(o => (Number(o.pos) + Number(1) / 100))))
        : Number(parent.pos) + Number(1) / 100;
      item.pos = item.parent && item.parent.id ? maxPos : null;

    } else { /* when updating an item only  */
      parent = await this.findOne({ id: item.id });
    }

    return this.save(item);
  }

  async deleteProduct(id: string): Promise<ResProdDto> {
    const exist = await this.findOne({ id });
    if (exist) {
      this.createQueryBuilder()
        .delete()
        .from(Product)
        .where("id = :id", { id })
        .execute();

      return exist;
    }
    return null;
  }

  async createProduct(dto: ReqProdDto): Promise<ResProdDto> {
    const total = await this.count();
    dto.pos = (Number(total) + 1).toFixed(2);
    return this.save(dto);
  }

  async getProducts(dto: any): Promise<ResProdDto[]> {
    const query = this.createQueryBuilder('product');
    _.mapValues(dto, _.method('toLowerCase')); // convert values to lowercases
    const where = dto;
    const page = Object.assign({}, {
      take: dto.take,
      skip: dto.skip
    });
    delete where.skip, where.take;

    if (where && Object.keys(where)) {
      Object.entries(where).forEach(c => {
        //transform entries into object
        const obj = Object.assign({}, Object.entries(c)
          .reduce((acc, [k, v]) => ({ ...acc, [c[0]]: v }), {})
        );
        //note: im just using orWhere so every criteria will match the database
        let op: sqlOp = sqlOp.iLike;
        if (+(Object.values(obj)[0])) op = sqlOp.eq;

        query.orWhere(`${Object.keys(obj)} ${op} :${Object.keys(obj)}`, obj)
      });
    }
    const products = await query
      .skip(page.skip).take(page.take)
      .leftJoinAndSelect('product.parent', 'parent_id')
      .orderBy("product.pos", "ASC")
      .addOrderBy('product.parent_id', 'ASC')
      .getMany();

    return products;
  }
}

