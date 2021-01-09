import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import * as _ from 'lodash';
import { Inspection } from './inspection.entity';
import { sqlOp } from 'src/models/generic.model';
import { SavedChecklistRepository } from 'src/saved-checklist/saved-checklist.repository';
import { GetInspectionDto } from './inspection.dto';
import { UserProfileRepository } from 'src/user-profile/user-profile.repository';
import { IUserProfileDto } from 'src/user-profile/user-profile.dto';
import { VenuesRepository } from 'src/venues/venues.repository';
import { IVenueDto } from 'src/venues/venues.dto';
import { SavedChecklistItemsRepository } from 'src/saved-checklist-items/saved-checklist-items.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { IProductDto } from 'src/products/products.dto';

@EntityRepository(Inspection)
export class InspectionRepository extends Repository<Inspection> {

  async finishInspection(dto: any): Promise<void> {
    const matches = await this.find({ saved_checklist: { id: dto.id } });
    
    if (matches && matches.length > 0) {
      const inspections = matches.map(m => {
        return {
          ...m,
          is_finished: true 
        }
      });
      await this.save(inspections);
    }
  }

  async deleteById(id: string): Promise<void> {
    await this.delete(id);
  }

  async getActiveInspection(dto: GetInspectionDto): Promise<any> {
    return this.getInspections(false);
  }

  async getFinishedInspection(dto: GetInspectionDto): Promise<any> {
    console.log(1)
    return this.getInspections(true);
  }

  async getInspections(isActive: boolean): Promise<any> {
    const repo = getCustomRepository(SavedChecklistRepository);
    const query = repo.createQueryBuilder('saved_checklist');

    let results = await query
      .leftJoinAndSelect('saved_checklist.checklist_items', 'checklist_items.saved_checklist')
      .leftJoinAndSelect('saved_checklist.checklist_contract', 'checklist_contract.saved_checklist')
      .leftJoinAndSelect('saved_checklist.user', 'user.saved_checklist')
      .leftJoinAndSelect('saved_checklist.inspection', 'inspection.saved_checklist')
      .orderBy("saved_checklist.desired_run_date", "DESC")
      .getMany();

    results.forEach(result => {
      if (result.user) {
        delete result.user.password;
        delete result.user.salt;
      }
    });

    const ret = await Promise.all(results.map(async (result) => {
      const up = await this.getProfileByUserId(result.user.id) || null;
      const venue = await this.getVenueById(result.checklist_contract.venue_id) || null;

      let checklist_items = await Promise.all(result.checklist_items.map(async (ci) => {
        return await this.getCheckListItemsById(ci.id) || null;
      }));

      /* eliminate the duplicate contract product items */
      let checklistContractIds: string[] = _.uniq(checklist_items.map(ci => ci.contract_product.id));

      /* extract the products from contract product */
      let products = checklist_items
        .filter(ci => checklistContractIds.filter(i => ci.contract_product === i))
        .map(p => ({ id: p.contract_product.product.id, product_name: p.contract_product.product.product_name }))

      /* remove products duplicates */
      products = _.uniqBy(products, 'id');

      /* count how many checklist in inspection */
      const inspectionCount = await this.getInInspectionById(result.id);

      return Object.assign({}, result, {
        user: Object.assign({}, result.user, {
          image: up.image
        }),
        checklist_items: [],
        products,
        venue,
        inspectionCount,
        is_finished: result.inspection.map(i => i.is_finished).shift()
      });
    }));

    return ret.filter(r => r.is_finished === isActive);
  }

  async getInInspectionById(id: string): Promise<any> {
    const repo = getCustomRepository(InspectionRepository);
    const query = repo.createQueryBuilder('inspection')
    const result: number = await query
      .where("saved_checklist_id = :id", { id })
      .getCount();

    return result;
  }

  async getCheckListItemsById(id: string): Promise<any> {
    const repo = getCustomRepository(SavedChecklistItemsRepository);
    const query = repo.createQueryBuilder('saved_checklist_item')
      .leftJoinAndSelect('saved_checklist_item.contract_product', 'contract_product.checklist_product')

    let results: any[] = (await query
      .where("saved_checklist_item.id = :id", { id })
      .getMany());

    const ret = await Promise.all(results.map(async (r) => {
      const product = await this.getProductById(r.contract_product.child_id);

      return Object.assign({}, r, {
        contract_product: { ...r.contract_product, product }
      });
    }));

    return ret.shift();
  }

  async getProductById(id: string): Promise<any> {
    const repo = getCustomRepository(ProductsRepository);
    const query = repo.createQueryBuilder('product')

    const result: IProductDto = (await query
      .where("product.id = :id", { id })
      .getMany()).shift();

    return result;
  }

  async getVenueById(venueId: string): Promise<any> {
    const repo = getCustomRepository(VenuesRepository);
    const query = repo.createQueryBuilder('venue');
    const result: IVenueDto = (await query
      .where("id = :id", { id: venueId })
      .getMany()).shift();

    return result;
  }

  async getProfileByUserId(userId: string): Promise<any> {
    const repo = getCustomRepository(UserProfileRepository);
    const query = repo.createQueryBuilder('user_profile');
    const result: IUserProfileDto = (await query
      .where("user_profile.user_id = :userId", { userId })
      .getMany()).shift();

    return result;
  }
}