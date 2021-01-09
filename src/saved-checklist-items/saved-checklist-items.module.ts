
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SavedChecklistItemsController } from './saved-checklist-items.controller';
import { SavedChecklistItemsService } from './saved-checklist-items.service';
import { SavedChecklistItemsRepository } from './saved-checklist-items.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SavedChecklistItemsRepository])],
  controllers: [SavedChecklistItemsController],
  providers: [SavedChecklistItemsService]
})
export class SavedChecklistItemModule { }
