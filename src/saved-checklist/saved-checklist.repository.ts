import { sqlOp } from '../models/generic.model';
import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import * as _ from 'lodash';
import { SavedChecklist } from './saved-checklist.entity';
import { GetSavedChecklistDto, ISavedChecklistDto } from './saved-checklist.dto';
import { SavedChecklistItemsRepository } from '../saved-checklist-items/saved-checklist-items.repository';
import { ISavedChecklistItem, ISavedChecklistItemDto } from '../saved-checklist-items/saved-checklist-items.dto';
import { SavedChecklistItem } from '../saved-checklist-items/saved-checklist-items.entity';
import { IProductDto } from '../products/products.dto';
import { ProductsRepository } from '../products/products.repository';
import { UserRepository } from '../user/user.repository';
import { IUserDto } from '../user/user.dto';
import { Console } from 'console';

@EntityRepository(SavedChecklist)
export class SavedChecklistRepository extends Repository<SavedChecklist> {
  async deleteById(id: string): Promise<void> {
    await this.delete(id);
  }

  async getChecklistsById(id: string): Promise<ISavedChecklistDto[]> {
    const query = this.createQueryBuilder('saved_checklist');
    const results: ISavedChecklistDto[] = await query
      .leftJoinAndSelect("saved_checklist.checklist_contract", "contracts.checklist_contract")
      .leftJoinAndSelect("saved_checklist.checklist_items", "saved_checklist_items.saved_checklist")
      .where("saved_checklist.id = :id", { id })
      .getMany();

    let response: ISavedChecklistDto[] = await Promise.all(results.map(async (c) => {
      let _checklist_items: any[] = await this.getChecklistItemById(c.id);

      let checklist_items = await Promise.all(_checklist_items.map(async (ci) => {

        return {
          ...ci,
          contract_product: {
            id: ci.contract_product.id,
            product: await this.getChecklistProductById(ci.contract_product.child_id)
          }
        }
      }))
      return { ...c, checklist_items }
    }));

    return response;
  }

  async getChecklistProductById(id: string): Promise<IProductDto> {
    const repo = getCustomRepository(ProductsRepository);
    const query = repo.createQueryBuilder('products');
    const result: IProductDto = (await query
      .where("id = :id", { id })
      .getMany()).shift();

    return result;
  }

  async getChecklistItemById(id: string): Promise<ISavedChecklistItem[]> {
    const repo = getCustomRepository(SavedChecklistItemsRepository);
    const query = repo.createQueryBuilder('saved_checklist_item');
    const results: SavedChecklistItem[] = await query
      .leftJoinAndSelect("saved_checklist_item.contract_product", "contract_products.contract_product")
      .leftJoinAndSelect("saved_checklist_item.contract_category", "contract_category.contract_category")
      .leftJoinAndSelect("saved_checklist_item.contract_term", "contract_term.contract_term")
      .where("saved_checklist_id = :id", { id })
      .getMany();
      
    return results;
  }

  async saveChecklist(dto: ISavedChecklistDto): Promise<ISavedChecklistDto> {
    const payload: ISavedChecklistDto = {
      id: dto.id,
      checklist_name: dto.checklist_name,
      assigned_to: dto.assigned_to,
      desired_run_date: dto.desired_run_date,
      checklist_contract: dto.checklist_contract,
      user: dto.user
    }

    const checklist_results = await this.save(payload);

    /* save to checklist items */
    const checklist_item_repo = getCustomRepository(SavedChecklistItemsRepository);
    const ci_payload: ISavedChecklistItem[] = dto.checklist_items.map(item => {
      return {
        saved_checklist: checklist_results,
        ...item,
      }
    });

    const checklist_items_results = await checklist_item_repo.save(ci_payload);
    const response = {
      ...checklist_results,
      checklist_items_results
    }

    return response;
  }

  async getChecklists(dto: GetSavedChecklistDto): Promise<ISavedChecklistDto[]> {
    const query = this.createQueryBuilder('saved_checklist');
    _.mapValues(dto, _.method('toLowerCase')); // convert values to lowercases
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
        if (+(Object.values(obj).shift())) op = sqlOp.eq;

        query.orWhere(`${Object.keys(obj)} ${op} :${Object.keys(obj)}`, obj)
      });
    }

    const results = await query
      .orderBy("saved_checklist.created_at", "DESC")
      .skip(page.skip).take(page.take)
      .getMany();

    const ret = await Promise.all(results.map(async (r) => {
      const item = Object.assign({}, r, {
        user: await this.getUserById(r.user_id)
      })

      delete item.user_id;
      return item;
    }))

    return ret;
  }

  async getUserById(id: string): Promise<any> {
    const repo = getCustomRepository(UserRepository);
    const query = repo.createQueryBuilder('user')
    const result: IUserDto = (await query
      .where("id = :id", { id })
      .getMany()).shift();

    delete result.password;
    delete result.salt;

    return result;
  }
}


