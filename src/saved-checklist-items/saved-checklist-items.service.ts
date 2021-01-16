
import { GCDto } from '../contracts/contracts.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';
import { SavedChecklistItem } from './saved-checklist-items.entity';
import { SavedChecklistItemsRepository } from './saved-checklist-items.repository';

@Injectable()
export class SavedChecklistItemsService extends BaseService<SavedChecklistItem> {
  constructor(@InjectRepository(SavedChecklistItemsRepository) public repo: SavedChecklistItemsRepository) {
    super(repo);
  }
}
