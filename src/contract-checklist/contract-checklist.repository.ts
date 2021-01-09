import { ContractChecklist } from './contract-checklist.entity';
import { Repository, EntityRepository, getCustomRepository, getRepository, Any } from 'typeorm';
import * as _ from 'lodash';
@EntityRepository(ContractChecklist)
export class ContractChecklistRepository extends Repository<ContractChecklist> {

  // async override(dto: OverrideChecklistItemDto): Promise<IChecklistDto[]> {
  //   /* get the existing checklists to be remove and updated */
  //   let destination: ContractChecklist[];
  //   let source: ContractChecklist[];

  //   /* get the existing source items base on contract and product ids */
  //   if (dto && dto.source) {
  //     source = await this.getItems(
  //       [dto.source.checklist_contract.id],
  //       [dto.source.checklist_product.id]
  //     );
  //   }

  //   /* create new items from the source */
  //   let payload: IChecklistDto;
  //   payload = Object.assign({}, {
  //     ...dto.source,
  //     /* override product */
  //     checklist_product: { id: dto.destination.checklist_product.id },
  //     id: dto.destination.id /* override id */
  //   });
  
  //   await this.save(payload);

  //   /* get venue products */
  //   const checklistItemRepo = getRepository(ContractChecklist);
  //   const checklistItemQuery = checklistItemRepo.createQueryBuilder('contract_checklist')
  //     .leftJoinAndSelect('contract_checklist.checklist_contract', 'contract')
  //     .leftJoinAndSelect('contract_checklist.checklist_product', 'contract_product')
  //     .leftJoinAndSelect('contract_checklist.checklist_category', 'contract_category')
  //     .leftJoinAndSelect('contract_checklist.checklist_term', 'contract_term')
  //     .orderBy("contract_checklist.created_at", "DESC")
  //   const rawResults = await checklistItemQuery.getMany();

  //   const results = this.fmtResults(rawResults);
  //   return results;
  // }

  // async multipleDelete(dto: IChecklistProdArrDto[]): Promise<IChecklistDto[]> {
  //   const exist = await this.findByIds(dto.map(c => c.id));
  //   if (exist && exist.length > 0) {
  //     await this.delete(exist.map(i => i.id));
  //   }
  //   return exist;
  // }

  // async getChecklists(dto?: any): Promise<IChecklistDto[]> {
  //   const query = this.createQueryBuilder('contract_checklist');
  //   _.mapValues(dto, _.method('toLowerCase')); // convert values to lowercases
  //   const where = dto;
  //   const page = Object.assign({}, {
  //     take: dto.take,
  //     skip: dto.skip
  //   });
  //   delete where.skip, where.take;

  //   if (where && Object.keys(where)) {
  //     Object.entries(where).forEach(c => {
  //       //transform entries into object
  //       const obj = Object.assign({}, Object.entries(c)
  //         .reduce((acc, [k, v]) => ({ ...acc, [c[0]]: v }), {})
  //       );
  //       //note: im just using orWhere so every criteria will match the database
  //       let op: sqlOp = sqlOp.iLike;
  //       if (+(Object.values(obj)[0])) op = sqlOp.eq;

  //       query.orWhere(`${Object.keys(obj)} ${op} :${Object.keys(obj)}`, obj)
  //     });
  //   }
  //   const checklists = await query
  //     .skip(page.skip).take(page.take)
  //     .leftJoinAndSelect('contract_checklist.checklist_contract', 'contract')
  //     .leftJoinAndSelect('contract_checklist.checklist_product', 'contract_product')
  //     .leftJoinAndSelect('contract_checklist.checklist_category', 'contract_category')
  //     .leftJoinAndSelect('contract_checklist.checklist_term', 'contract_term')
  //     .orderBy("contract_checklist.created_at", "DESC")
  //     .getMany();

  //   let ret = this.fmtResults(checklists);
  //   return ret;
  // }

  // async fmtResults(checklists: ContractChecklist[]): Promise<IChecklistDto[]> {
  //   return await Promise.all(checklists.map(async (c) => {
  //     return {
  //       id: c.id,
  //       checklist_contract: {
  //         id: c.checklist_contract && c.checklist_contract.id,
  //         contract_name: c.checklist_contract && c.checklist_contract.contract_name
  //       },
  //       checklist_product: {
  //         id: c.checklist_product.id,
  //         product: {
  //           ...await this.getChecklistProduct(c.checklist_product.id),
  //           _id: c.checklist_product.id
  //         }
  //       },
  //       checklist_category: c.checklist_category,
  //       checklist_term: c.checklist_term
  //     }
  //   }));
  // }

  // async deleteById(id: string): Promise<ContractChecklist> {
  //   const exist = await this.findOne({ id });
  //   if (exist) {
  //     await this.delete(id);
  //   }
  //   return exist;
  // }

  // async getItems(contract_ids: string[], product_ids: string[]): Promise<any[]> {
  //   const results = await
  //     this.createQueryBuilder('contract_checklist')
  //       .leftJoinAndSelect('contract_checklist.checklist_contract', 'contract')
  //       .leftJoinAndSelect('contract_checklist.checklist_product', 'contract_product')
  //       .leftJoinAndSelect('contract_checklist.checklist_category', 'contract_category')
  //       .leftJoinAndSelect('contract_checklist.checklist_term', 'contract_term')
  //       .where(`contract_checklist.contract_id IN (:...contract_ids) 
  //     AND contract_checklist.contract_product_id IN (:...product_ids)`, { contract_ids, product_ids })
  //       .getMany();

  //   return results;
  // }

  // async saveChecklist(dto: IChecklistProdArrDto): Promise<IChecklistDto[]> {
  //   /* build the checklist payload */
  //   let payload: any = [];
  //   dto.checklist_product.forEach(p => {
  //     const item = {
  //       checklist_product: p,
  //       checklist_contract: dto.checklist_contract,
  //       checklist_category: dto.checklist_category,
  //       checklist_term: dto.checklist_term
  //     }
  //     payload.push(item);
  //   });
  //   const result: IChecklistDto = (await this.save(payload)).shift();

  //   let fmtResult: IChecklistDto = Object.assign({}, result);
  //   let res: any;
  //   await new Promise(async (resolve) => {
  //     const results = {
  //       ...result,
  //       checklist_product: {
  //         id: fmtResult.checklist_product.id,
  //         product: await this.getChecklistProduct(fmtResult.checklist_product.id)
  //       }
  //     };
  //     res = results;
  //     resolve(res);
  //   });
  //   return res;
  // }

  // async getChecklistProduct(id: string): Promise<IProductDto> {
  //   /* we need to get the contract product first */
  //   const contractProductRepo = getCustomRepository(ContractProductRepository);
  //   const contractProductQuery = contractProductRepo.createQueryBuilder('contract_products');
  //   const contractProductResult: ContractProduct = (await contractProductQuery
  //     .where("contract_products.id = :id", { id })
  //     .getMany()).shift();

  //   const productId = contractProductResult.child_id;

  //   /* then get the product base on id */
  //   const productRepo = getCustomRepository(ProductsRepository);
  //   const productQuery = productRepo.createQueryBuilder('products');
  //   const result: IProductDto = (await productQuery
  //     .where("id = :id", { id: productId })
  //     .getMany()).shift();

  //   return result;
  // }
}