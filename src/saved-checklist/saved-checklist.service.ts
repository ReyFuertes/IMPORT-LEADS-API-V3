
import { GCDto } from '../contracts/contracts.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { SavedChecklist } from './saved-checklist.entity';
import { SavedChecklistRepository } from './saved-checklist.repository';
import { GetSavedChecklistDto, ISavedChecklistDto } from './saved-checklist.dto';
import { ISavedChecklistItem, ISavedChecklistItemDto } from 'src/saved-checklist-items/saved-checklist-items.dto';

@Injectable()
export class SavedChecklistService extends BaseService<SavedChecklist> {
  constructor(@InjectRepository(SavedChecklistRepository) public repo: SavedChecklistRepository) {
    super(repo);
  }

  async deleteById(id: string): Promise<void> {
    return this.repo.deleteById(id);
  }
  
  async getChecklistsById(id: string): Promise<ISavedChecklistDto[]> {
    return this.repo.getChecklistsById(id);
  }

  async getChecklists(dto: GetSavedChecklistDto): Promise<ISavedChecklistDto[]> {
    return this.repo.getChecklists(dto);
  }

  async saveChecklist(dto: ISavedChecklistDto): Promise<ISavedChecklistDto> {
    return this.repo.saveChecklist(dto);
  }
}
