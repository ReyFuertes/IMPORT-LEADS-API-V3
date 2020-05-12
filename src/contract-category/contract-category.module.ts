import { ContractCategoryService } from './contract-category.service';
import { ContractCategoryController } from './contract-category.controller';
import { ContractCategoryRepository } from './contract-category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([ContractCategoryRepository])],
  controllers: [ContractCategoryController],
  providers: [ContractCategoryService]
})
export class ContractCategoryModule { }
