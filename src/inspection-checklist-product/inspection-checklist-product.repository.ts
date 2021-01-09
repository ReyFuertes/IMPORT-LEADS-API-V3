import { sqlOp } from '../models/generic.model';
import { Repository, EntityRepository } from 'typeorm';
import _ = require("lodash");
import { InspectionChecklistProduct } from './inspection-checklist-product.entity';

@EntityRepository(InspectionChecklistProduct)
export class InspectionChecklistProductRepository extends Repository<InspectionChecklistProduct> {

}

