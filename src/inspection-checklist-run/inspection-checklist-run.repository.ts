import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import { InspectionChecklistRun } from './inspection-checklist-run.entity';
import { IInspectionChecklistRunDto, IInspectionRunDto, RunStatusType } from './inspection-checklist-run.dto';
import { SavedChecklistItemsRepository } from '../saved-checklist-items/saved-checklist-items.repository';
import { ProductsRepository } from '../products/products.repository';
import { IProductDto } from '../products/products.dto';
import { CategoryRepository } from '../category/category.repository';
import { CategoryDto } from '../category/category.dto';
import { InspectionChecklistCommentRepository } from '../inspection-checklist-comment/inspection-checklist-comment.repository';
import { IInspectionChecklistCommentDto } from '../inspection-checklist-comment/inspection-checklist-comment.dto';
import { BadRequestException } from '@nestjs/common';
import { InspectionRuntimeRepository } from '../inspection-runtime/inspection-runtime.repository';
import { InspectionChecklistProductRepository } from '../inspection-checklist-product/inspection-checklist-product.repository';
import { InspectionChecklistImageRepository } from '../inspection-checklist-image/inspection-checklist-image.repository';
import { InspectionRepository } from '../inspection/inspection.repository';
import * as moment from 'moment';
import { IInspectionChecklistProduct } from '../inspection-checklist-product/inspection-checklist-product.dto';

@EntityRepository(InspectionChecklistRun)
export class InspectionChecklistRunRepository extends Repository<InspectionChecklistRun> {

  async navigateTo(dto: { saved_checklist_id: string, position: number }): Promise<IInspectionChecklistRunDto> {
    try {
      const query = await this.createQueryBuilder('inspection_checklist_run')
        .where('inspection_checklist_run.saved_checklist_id = :saved_checklist_id', { saved_checklist_id: dto.saved_checklist_id })

      let record: any;

      const results: any[] = await query
        .select('id')
        .addSelect('row_number() OVER (ORDER BY "created_at" DESC)')
        .getRawMany()

      record = results.filter(r => Number(r.row_number) === Number(dto.position)).shift();
      return {
        ...record,
        count: record.row_number,
        run_status: record.run_status
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async copy(dto: { id: string, copyCount: number, contractProductId: string }): Promise<string> {
 
    const exist = await this.findOne({
      where: { id: dto.id },
      relations: ['inspection'],
    });

    if (exist) {
      for (let index = 0; index < dto.copyCount; index++) {
        /* save a new item in the checklist run */
        const checklistRunItemToCopy = Object.assign({}, exist);
        delete checklistRunItemToCopy.id;
        
        const newChecklistRun = await this.save(checklistRunItemToCopy);

        /* copy and save inspection checklist (comments, verification) */
        // let checklistItems = await this.getChecklistItemsByRunId(exist.id, dto.contractProductId);
        // checklistItems.forEach(i => {
        //   delete i.id;
        //   return Object.assign(i, { inspection_checklist_run: { id: newChecklistRun.id } })
        // });
        // const repo = getCustomRepository(InspectionChecklistCommentRepository);
        // await repo.save(checklistItems);

        /* copy and save filtered product */
        let ins_checklist_prod_items = await this.getChecklistProductItemsById(
          dto.id, /* pass the previous(base) id so we can get its items */
          dto.contractProductId);
        const insChecklistProduct = ins_checklist_prod_items.map(i => {
          return {
            contract_category: { id: i.contract_category.id },
            contract_product: { id: i.contract_product.id },
            contract_term: { id: i.contract_term.id },
            inspection_checklist_run: { id: newChecklistRun.id }
          }
        })

        const checklist_product_repo = getCustomRepository(InspectionChecklistProductRepository);
        await checklist_product_repo.save(insChecklistProduct);

        /* copy the images */
        insChecklistProduct.forEach(async (item) => {
          let checklistImages = await this.getInspectionChecklistImages(exist.id, item.contract_term.id);
          if (checklistImages && checklistImages.length > 0) {

            checklistImages.forEach(i => {
              delete i.id;
              return Object.assign(i, {
                inspection_checklist_run: { id: newChecklistRun.id },
                contract_term: { id: i.contract_term_id }
              })
            });

            const checklist_images_repo = getCustomRepository(InspectionChecklistImageRepository);
            await checklist_images_repo.save(checklistImages);
          }
        });
      }
    }

    /* get the last entry */
    const query = await this.createQueryBuilder('inspection_checklist_run')
    const results: any[] = await query
      .select('id')
      .addSelect('row_number() OVER (ORDER BY "created_at" DESC)')
      .getRawMany()

    const lastRecord = results[results.length - 1];

    return lastRecord;
  }

  async getInspectionChecklistImages(inspection_checklist_run_id: string, contract_term_id: string): Promise<any[]> {
    const repo = getCustomRepository(InspectionChecklistImageRepository);
    const query = repo.createQueryBuilder('inspection_checklist_image')
    const results: any[] = await query
      .where('inspection_checklist_run_id = :inspection_checklist_run_id', { inspection_checklist_run_id })
      .andWhere('contract_term_id = :contract_term_id', { contract_term_id })
      .getMany();

    return results;
  }

  async getChecklistItemsByRunId(inspection_checklist_run_id: string, contract_product_id?: string): Promise<IInspectionChecklistCommentDto[]> {
    const repo = getCustomRepository(InspectionChecklistCommentRepository);
    const query = repo.createQueryBuilder('inspection_checklist_comment')
    let results: IInspectionChecklistCommentDto[] = await query
      .leftJoinAndSelect('inspection_checklist_comment.contract_product', 'contract_product.checklist_product')
      .leftJoinAndSelect('inspection_checklist_comment.contract_term', 'contract_term.checklist_term')
      .leftJoinAndSelect('inspection_checklist_comment.contract_category', 'contract_category.checklist_category')
      .leftJoinAndSelect('inspection_checklist_comment.inspection_checklist_run', 'inspection_checklist_run.inspection_checklist_comment')
      .leftJoinAndSelect('inspection_checklist_comment.saved_checklist', 'saved_checklist.inspection_checklist_comment')
      .where('inspection_checklist_run_id = :inspection_checklist_run_id', { inspection_checklist_run_id })
      .getMany()

    /* filter results if there is a contract_product_id */
    if (contract_product_id) {
      results = results.filter(r => r.contract_product.id === contract_product_id);
    }

    return results;
  }

  async removeAndNavigateTo(dto: { id: string }): Promise<IInspectionRunDto> {
    /* get the previous */
    const repo = getCustomRepository(InspectionChecklistRunRepository);
    const query = await repo.createQueryBuilder('inspection_checklist_run')
    const results: any[] = await query
      .select('id')
      .addSelect('row_number() OVER (ORDER BY "created_at" DESC)')
      .getRawMany()

    const record = results.filter(r => r.id === dto.id).shift();

    /* get the previous row, so we can return it */
    const prevRow = Number(record.row_number) - 1;
    const prevRecord = results.filter(r => Number(r.row_number) === Number(prevRow)).shift();

    /* delete the current record */
    const exist = await this.findOne({ id: dto.id });
    if (exist) {
      await this.delete(dto.id);
    }

    return prevRecord;
  }

  async prev(dto: { id: string, saved_checklist_id: string }): Promise<any> {
    try {
      const query = await this.createQueryBuilder('inspection_checklist_run')
        .where('inspection_checklist_run.saved_checklist_id = :saved_checklist_id', { saved_checklist_id: dto.saved_checklist_id });

      let ret: any;
      let record: any;
      let prevRecord: any;
      let prevRow: any;

      const results: any[] = await query
        .select('id')
        .addSelect('row_number() OVER (ORDER BY "created_at" DESC)')
        .getRawMany()

      record = results.filter(r => r.id === dto.id).shift();

      /* get the prev record */
      prevRow = Number(record.row_number) - 1;
      prevRecord = results.filter(r => Number(r.row_number) === Number(prevRow)).shift();

      ret = await this.getInspectionsRunById(prevRecord.id);

      return ret;
    } catch (error) {
      throw new BadRequestException('No checklist found');
    }
  }

  async next(dto: { id: string, saved_checklist_id: string }): Promise<any> {
    try {
      const query = await this.createQueryBuilder('inspection_checklist_run')
        .where('inspection_checklist_run.saved_checklist_id = :saved_checklist_id', { saved_checklist_id: dto.saved_checklist_id });

      const totalCount = await query.getCount();

      let ret: any;
      let record: any;
      let nextRecord: any;
      let nextRow: any;

      const results: any[] = await query
        .select('id')
        .addSelect('row_number() OVER (ORDER BY "created_at" DESC)')
        .getRawMany();

      record = results.filter(r => r.id === dto.id).shift();

      /* check if record is the last record then create a copy and save new record */
      if (record && Number(record.row_number) === Number(totalCount)) {

        const exist = await this.findOne({
          where: { id: record.id },
          relations: ['inspection'],
        });

        let rec: any;

        if (exist) {
          /* we need to get the products from the previous inspection run
          so we can copy and insert into the next item */
          let ins_checklist_prod_items = await this.getChecklistProductItemsById(exist.id);

          /* save new inspection run */
          delete exist.id;
          rec = await this.save(exist);

          /* insert product */
          const insChecklistProduct: IInspectionChecklistProduct[] = ins_checklist_prod_items.map(i => {
            return {
              contract_category: { id: i.contract_category.id },
              contract_product: { id: i.contract_product.id },
              contract_term: { id: i.contract_term.id },
              inspection_checklist_run: { id: rec.id },
              saved_checklist: { id: i.saved_checklist.id },
            }
          })
          const checklist_product_repo = getCustomRepository(InspectionChecklistProductRepository);
          await checklist_product_repo.save(insChecklistProduct);

        }
        ret = await this.getInspectionsRunById(rec.id);
    
      } else {
        /* get the next record */
        nextRow = Number(record.row_number) + 1;
        nextRecord = results.filter(r => Number(r.row_number) === Number(nextRow)).shift();

        ret = await this.getInspectionsRunById(nextRecord.id);
      }

      return ret;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getInspectionsRunById(id: string): Promise<any> {
    const repo = getCustomRepository(InspectionChecklistRunRepository);
    const query = repo.createQueryBuilder('inspection_checklist_run')
    const results: any[] = await query
      .leftJoinAndSelect('inspection_checklist_run.saved_checklist', 'saved_checklist.inspection_checklist_run')
      .leftJoinAndSelect('inspection_checklist_run.inspection_checklist_product', 'inspection_checklist_product.inspection_checklist_run')
      .where('inspection_checklist_run.id = :id', { id })
      .getMany();

    let ret = await Promise.all(results.map(async (ins) => {
      delete ins.saved_checklist_id;

      const checklist_id = ins.saved_checklist ? ins.saved_checklist.id : null;
      const items = await this.getChecklistProductItemsById(id);

      const checklist = { ...ins.saved_checklist, items };

      const rows: any = await this.createQueryBuilder('inspection_checklist_run')
        .select('id')
        .addSelect('row_number() OVER (ORDER BY "created_at" DESC)')
        .where('saved_checklist_id = :saved_checklist_id', { saved_checklist_id: checklist_id })
        .getRawMany();

      return Object.assign({}, {
        id: ins.id,
        checklist,
        count: rows.filter(r => r.id === ins.id).shift().row_number,
        run_status: ins.run_status
      })
    }));

    return ret.shift();
  }

  async getChecklistProductItemsById(ins_checklist_run_id: string, contract_product_id?: string): Promise<IInspectionChecklistRunDto[]> {
    const repo = getCustomRepository(InspectionChecklistProductRepository);
    const query = repo.createQueryBuilder('inspection_checklist_product')
    let results: any[] = await query
      .leftJoinAndSelect('inspection_checklist_product.contract_product', 'contract_product.checklist_product')
      .leftJoinAndSelect('inspection_checklist_product.contract_term', 'contract_term.checklist_term')
      .leftJoinAndSelect('inspection_checklist_product.contract_category', 'contract_category.checklist_category')
      .leftJoinAndSelect('inspection_checklist_product.inspection_checklist_run', 'inspection_checklist_run.inspection_checklist_product')
      .leftJoinAndSelect('inspection_checklist_product.saved_checklist', 'saved_checklist.inspection_checklist_product')
      .where('inspection_checklist_run_id = :ins_checklist_run_id', { ins_checklist_run_id })
      .getMany();

    if (contract_product_id) {
      results = results.filter(r => r.contract_product.id === contract_product_id)
    }
 
    const ret = await Promise.all(results.map(async (r) => {
      const product = await this.getProductById(r.contract_product.child_id);
      const category = await this.getCategoryById(r.contract_category.category_id);
      const checklist_item = await this.getInsCheckItemContractTermById(r?.contract_term?.id, r?.contract_category?.id, ins_checklist_run_id, r?.contract_product?.id)
  
      delete r.contract_category.category_id;
  
      return Object.assign({}, r, {
        contract_product: { ...r.contract_product, product },
        contract_category: { ...r.contract_category, category },
        checklist_item,
        saved_checklist: { id: r?.saved_checklist?.id },
      });
    }));

    return ret;
  }

  async getInsCheckItemContractTermById(term_id: string, category_id: string, inspection_checklist_run_id: string, contract_product_id: string): Promise<any> {

    const repo = getCustomRepository(InspectionChecklistCommentRepository);
    const query = repo.createQueryBuilder('inspection_checklist_comment')
    const result: IInspectionChecklistCommentDto = await query
      .where('contract_term_id = :term_id', { term_id })
      .andWhere('contract_category_id = :category_id', { category_id })
      .andWhere('contract_product_id = :contract_product_id', { contract_product_id })
      .andWhere('inspection_checklist_run_id = :inspection_checklist_run_id', { inspection_checklist_run_id })
      .getOne();

    return result;
  }

  async getCategoryById(id: string): Promise<any> {
    const repo = getCustomRepository(CategoryRepository);
    const query = repo.createQueryBuilder('category')
    const result: CategoryDto = await query.where('id = :id', { id }).getOne();

    return result;
  }

  async getProductById(id: string): Promise<any> {
    const repo = getCustomRepository(ProductsRepository);
    const query = repo.createQueryBuilder('product')

    const result: IProductDto = (await query
      .where('product.id = :id', { id })
      .getMany()).shift();

    return result;
  }

  async run(dto: IInspectionRunDto): Promise<IInspectionRunDto> {
    let ret: IInspectionRunDto;
    let inspection: any;

    /* checklist run matchers */
    const matches = await (await this.find({ saved_checklist_id: dto.saved_checklist.id }));

    /* check if the run is paused or not */
    const hasPaused = matches.filter(m => Number(m.run_status) === RunStatusType.paused).shift();

    /* check if the run is pause, if yes then return it */
    if (hasPaused) {
      ret = hasPaused;
    } else {
      /* insert to inspection */
      const inspection_repo = getCustomRepository(InspectionRepository);
      inspection = await inspection_repo.save({
        saved_checklist: { id: dto.saved_checklist.id }
      });

      ret = await this.save({
        ...dto,
        inspection: { id: inspection.id }
      });

      /* get saved checklist products, so we can save it on checklist products */
      const saved_checklist_items_repo = getCustomRepository(SavedChecklistItemsRepository);
      const saved_checklist_items_query = await saved_checklist_items_repo.createQueryBuilder('saved_checklist_item');

      const saved_checklist_item_results: any[] = await saved_checklist_items_query
        .leftJoinAndSelect('saved_checklist_item.contract_product', 'contract_product.saved_checklist_item')
        .leftJoinAndSelect('saved_checklist_item.contract_term', 'contract_term.checklist_term')
        .leftJoinAndSelect('saved_checklist_item.contract_category', 'contract_category.checklist_category')
        .where("saved_checklist_id = :saved_checklist_id", { saved_checklist_id: dto.saved_checklist.id })
        .getMany();

      let checklistProducts = saved_checklist_item_results.map(sc => {
        return {
          contract_product: sc.contract_product,
          contract_category: sc.contract_category,
          contract_term: sc.contract_term,
          saved_checklist: { id: dto.saved_checklist.id }
        }
      });

      /* save checklist product/s */
      const checklist_product_repo = getCustomRepository(InspectionChecklistProductRepository);
      let checklist_product_payload: IInspectionChecklistProduct[] = checklistProducts.map(cp => {
        return {
          contract_product: { id: cp.contract_product.id },
          contract_category: { id: cp.contract_category.id },
          contract_term: { id: cp.contract_term.id },
          inspection_checklist_run: { id: ret.id },
          saved_checklist: { id: cp.saved_checklist.id }
        }
      })

      await checklist_product_repo.save(checklist_product_payload);
    }

    /* save checklist run */
    const runtime_repo = getCustomRepository(InspectionRuntimeRepository);

    await runtime_repo.save({
      run_start: moment(new Date()).format(),
      inspection: { id: inspection.id }
    });

    return ret;
  }

  async deleteById(id: string): Promise<void> {
    await this.delete(id)
  }
}

