import { sqlOp } from '../models/generic.model';
import { Repository, EntityRepository } from 'typeorm';
import * as _ from 'lodash';
import { BadRequestException } from '@nestjs/common';
import { SavedChecklistItem } from './saved-checklist-items.entity';

@EntityRepository(SavedChecklistItem)
export class SavedChecklistItemsRepository extends Repository<SavedChecklistItem> {
 
}

