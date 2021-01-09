import { ContractChecklistRepository } from './contract-checklist.repository';
import { ContractChecklistController } from './contract-checklist.controller';
import { ContractChecklistService } from './contract-checklist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([ContractChecklistRepository])],
  controllers: [ContractChecklistController],
  providers: [ContractChecklistService]
})
export class ContractChecklistModule { }
