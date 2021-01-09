
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SavedChecklistController } from './saved-checklist.controller';
import { SavedChecklistService } from './saved-checklist.service';
import { SavedChecklistRepository } from './saved-checklist.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SavedChecklistRepository])],
  controllers: [SavedChecklistController],
  providers: [SavedChecklistService]
})
export class SavedChecklistModule { }
