import { Product } from './../products/products.entity';
import { ReqCPDto, ContractProductResponseDto, SingleCPDto } from './contract-product.dto';
import { ProductsRepository } from './../products/products.repository';
import { ContractProduct } from './contract-products.entity';
import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import * as _ from 'lodash';

@EntityRepository(ContractProduct)
export class ContractProductRepository extends Repository<ContractProduct> {

  async getByContractId(id: string): Promise<ContractProductResponseDto[]> {
    const query = this.createQueryBuilder('contract_product');
    const results = await query
      .leftJoinAndSelect("contract_product.parent", "products.parent")
      .leftJoinAndSelect("contract_product.child", "products.child")
      .where("contract_product.contract_id = :id", { id })
      .getMany();

    const ret: ContractProductResponseDto[] = [];
    /* collect all parents */
    let parent = results.filter(x => !x.parent)
      .map(cp => {
        return {
          _id: cp.id,
          ...cp.child,
          qty: cp.qty,
          cost: cp.cost
        }
      });

    /* collect all childs */
    const child = results.filter(x => x.parent)
      .map(cp => {
        return Object.assign({}, { parent_id: cp.id }, cp);
      });

    /* collect and construct parent child object */
    parent.forEach(p => {
      let _childArr: any[] = [];
      child.forEach(c => {
        if (p.id === c.parent_id) {
          delete c.child.created_at;
          //delete c.child.updated_at;

          _childArr.push({
            ...Object.assign({}, c.child, {
              //id: c.child_id,
              id: c.child.id,
              qty: c.qty,
              cost: c.cost,
              _id: c.id
            })
          })
          return;
        }
      });
      ret.push({ ...p, sub_products: _childArr })
    });

    return ret;
  }

  async saveContractProduct(dto: ReqCPDto): Promise<ContractProductResponseDto> {
    const product_repo = getCustomRepository(ProductsRepository);
    const totalRec = await product_repo.createQueryBuilder().getCount();

    /* increment position */
    const { id, parent, children, contract } = dto;
    parent.pos = totalRec ? totalRec + 1 : 1;

    /* combine parent and childs */
    const contract_products = children.concat(parent);

    /* build contract product payload */
    let cp_payload: SingleCPDto[] = contract_products
      .map((cp: any) => {
        return _.pickBy({
          id: cp._id,
          parent: parent && cp.id !== parent.id ? parent : null,
          child: cp,
          qty: cp.qty,
          cost: cp.cost,
          contract
        }, _.identity)
      })

    let results: any[] = [];
    let count: number = 0;

    await new Promise((resolve) => {
      cp_payload.forEach(async (cp) => {
        /* if the parent or child doesnt have an id then insert to products */
        if (cp.parent && !cp.parent.id) {
          cp.parent = await product_repo.save(cp.parent);
        }
        if (cp.child && !cp.child.id) {
          cp.child = await product_repo.save(cp.child);
        }

        /* if the product has an id then update to contract products */
        results.push(await this.save(cp));
        count++;

        if (cp_payload.length === count) {
          resolve(results);
        }
      });
    })

    /* get the parent */
    let _parent: Product = results
      .map(r => r.parent ? r.parent : r.child).filter(Boolean)[0];

    /* collect all the childrens */
    let sub_products: Product[] = results
      .filter(sp => {
        return sp.parent ? (sp.child.id !== _parent.id ? sp.child : sp) : null;
      })
      .map(c => c.child);

    /* build dto response */
    const ret: ContractProductResponseDto = {
      ..._parent,
      sub_products,
      contract: {
        id: contract.id,
        contract_name: contract.contract_name
      }
    }
    return ret;
  }
}