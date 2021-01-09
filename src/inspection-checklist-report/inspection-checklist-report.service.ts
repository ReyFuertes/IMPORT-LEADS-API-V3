import { Injectable } from "@nestjs/common";
import { InspectionChecklistRunRepository } from "src/inspection-checklist-run/inspection-checklist-run.repository";
import { Any, getCustomRepository } from "typeorm";
import * as moment from 'moment';
import { InspectionRepository } from "src/inspection/inspection.repository";
import { InspectionRuntimeRepository } from "src/inspection-runtime/inspection-runtime.repository";
import * as _ from 'lodash';
import { InspectionVerificationType } from "src/inspection-checklist-comment/inspection-checklist-comment.dto";
import { InspectionChecklistProductRepository } from "src/inspection-checklist-product/inspection-checklist-product.repository";
import { InspectionChecklistCommentRepository } from "src/inspection-checklist-comment/inspection-checklist-comment.repository";
import { ProductsRepository } from "src/products/products.repository";
import { SavedChecklistRepository } from "src/saved-checklist/saved-checklist.repository";
import { IUserDto } from "src/user/user.dto";

@Injectable()
export class InspectionChecklistReportService {
  constructor() { }

  async getInspector(saved_checklist_id: string): Promise<any> {
    const repo = getCustomRepository(SavedChecklistRepository);
    const query = repo.createQueryBuilder('saved_checklist')
      .leftJoinAndSelect('saved_checklist.user', 'user.saved_checklist')

    const inspector: any = await query
      .where("saved_checklist.id = :id", { id: saved_checklist_id })
      .getOne();

    const userDto = inspector?.user;
    delete userDto.password;
    delete userDto.salt;

    return userDto
  }

  async getProductReport(saved_checklist_id: string): Promise<any> {
    const repo = getCustomRepository(InspectionChecklistProductRepository);
    const query = repo.createQueryBuilder('inspection_checklist_product')
      .leftJoinAndSelect('inspection_checklist_product.saved_checklist', 'saved_checklist.inspection_checklist_product')
      .leftJoinAndSelect('inspection_checklist_product.contract_product', 'contract_product.inspection_checklist_product')
      .leftJoinAndSelect('inspection_checklist_product.contract_term', 'contract_term.inspection_checklist_product')
      .leftJoinAndSelect('inspection_checklist_product.inspection_checklist_run', 'inspection_checklist_run.inspection_checklist_product');

    let _products: any[] = await query.getMany();

    let products = _products.filter(r => r.saved_checklist?.id === saved_checklist_id);
    products = _.uniqBy(products, function (e) {
      return e.contract_product.id;
    });

    const comments: any[] = await this.getInspectionComments(saved_checklist_id);

    const failedItems: any[] = comments.filter(c =>
      c.verification === InspectionVerificationType.failed
      && c.saved_checklist.id === saved_checklist_id
    ).map(i => {
      return {
        contract_term: i.contract_term,
        contract_product: i.contract_product,
        inspection_checklist_run: i.inspection_checklist_run,
        saved_checklist: i.saved_checklist
      }
    });

    products = await Promise.all(products.map(async (r) => {
      const product = await this.getProductById(r.contract_product.child_id);

      const failedProductCountByTerms = _products.filter(p => failedItems.filter(f =>
        p.contract_term.id === f.contract_term.id
        && p.contract_product.id === f.contract_product.id
        && r.contract_product.id === f.contract_product.id
        && p.inspection_checklist_run.id === f.inspection_checklist_run.id).shift());

      const passedProductCountByTerms = _products.filter(p =>
        p.contract_term.id === r.contract_term.id
        && p.contract_product.id === r.contract_product.id);

      const passedTermsCount = passedProductCountByTerms.length > 0 ? (passedProductCountByTerms.length - failedProductCountByTerms.length)
        : 0;

      return {
        contract_product: {
          id: r.id,
          saved_checklist: { id: r.saved_checklist.id }
        },
        product: {
          id: product.id,
          product_name: product.product_name
        },
        failedTermsCount: failedProductCountByTerms.length,
        passedTermsCount
      }
    }));
 
    const totalFailedTermsCount = products?.map(i => i?.failedTermsCount || 0)
      .reduce((a, b: any) => a + b);
    const totalPassedTermsCount = products?.map(i => i?.passedTermsCount || 0)
      .reduce((a, b: any) => a + b);

    return {
      products,
      totalFailedTermsCount,
      totalPassedTermsCount,
      totalItems: products.length
    }
  }

  async getProductById(id: string): Promise<any> {
    const repo = getCustomRepository(ProductsRepository);
    const query = repo.createQueryBuilder('product')

    let result: any = await query
      .where("id = :id", { id })
      .getOne();

    return result;
  }

  async getInspectionComments(saved_checklist_id: string): Promise<any> {
    const repo = getCustomRepository(InspectionChecklistCommentRepository);
    const query = repo.createQueryBuilder('inspection_checklist_comment')
      .leftJoinAndSelect('inspection_checklist_comment.saved_checklist', 'saved_checklist.inspection_checklist_comment')
      .leftJoinAndSelect('inspection_checklist_comment.contract_product', 'contract_product.inspection_checklist_comment')
      .leftJoinAndSelect('inspection_checklist_comment.contract_term', 'contract_term.inspection_checklist_comment')
      .leftJoinAndSelect('inspection_checklist_comment.inspection_checklist_run', 'inspection_checklist_run.inspection_checklist_comment');

    let results: any = await query.getMany();

    results = results.filter(r => r.saved_checklist.id === saved_checklist_id);

    return results;
  }

  async getBarReport(id: string): Promise<any> {
    /* get inspection */
    const inspection_repo = getCustomRepository(InspectionRepository);
    const inspection_query = inspection_repo.createQueryBuilder('inspection');

    let inspection_results: any[] = await inspection_query
      .leftJoinAndSelect('inspection.saved_checklist', 'inspection.saved_checklist')
      .where('saved_checklist_id = :id', { id })
      .getMany();
 
    let inspections = await Promise.all(inspection_results.map(async (inspection) => {
      const runTime = await this.getRuntime(inspection.id);
      const inspector = await this.getInspector(inspection.saved_checklist.id);

      if (!runTime?.run_end) return;

      const itemCount = await this.getTotalRunItemCount(inspection.id);
      const runStart = moment(runTime?.run_start);
      const runEnd = moment(runTime?.run_end);

      const duration = moment.duration(runEnd.diff(runStart));
      const hours = duration.hours() || 0;
      const minutes = duration.minutes() || 0;
      const seconds = duration.seconds() || 0;
      const time = duration.asMinutes().toFixed(2);

      return {
        id: inspection.id,
        runTime: { hours, minutes, seconds, time },
        totalRuntime: `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`,
        itemCount,
        runStart,
        runEnd,
        inspector
      };
    }));

    inspections = _.reject(inspections, _.isNil);

    /* sum all hours, minutes and seconds */
    const hours = inspections?.map(i => i?.runTime?.hours || 0)
      .reduce((a, b: any) => a + b);
    const minutes = inspections?.map(i => i?.runTime?.minutes || 0)
      .reduce((a, b: any) => a + b);
    const seconds = inspections?.map(i => i?.runTime?.seconds || 0)
      .reduce((a, b: any) => a + b);
    const itemCount = inspections?.map(i => i?.itemCount || 0)
      .reduce((a, b: any) => a + b);

    return {
      inspections,
      totalItemsCheck: itemCount,
      totalTimeInspection: `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`,
      runStartdate: moment(inspections[0]?.runStart).format('MM/DD/YYYY HH:mm:ss'),
      runEnddate: moment(inspections[inspections.length - 1]?.runEnd).format('MM/DD/YYYY HH:mm:ss'),
    };
  }

  private padZero(n: number) {
    return (n < 10) ? ("0" + n) : n;
  }

  async getTotalRunItemCount(id: string): Promise<number> {
    const repo = getCustomRepository(InspectionChecklistRunRepository);
    const query = repo.createQueryBuilder('inspection_checklist_run');

    let result: number = await query.where("inspection_id = :id", { id })
      .getCount();

    return result;
  }

  async getRuntime(id: string): Promise<any> {
    const repo = getCustomRepository(InspectionRuntimeRepository);
    const query = repo.createQueryBuilder('inspection_runtime');

    let result: any = await query.where("inspection_id = :id", { id })
      .getOne();

    return result;
  }
}

