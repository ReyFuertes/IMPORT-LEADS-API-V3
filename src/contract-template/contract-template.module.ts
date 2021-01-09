import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ContractTemplateRepository } from './contract-template.repository';
import { ContractTemplateController } from './contract-template.controller';
import { ContractTemplateService } from './contract-template.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContractTemplateRepository])],
  controllers: [ContractTemplateController],
  providers: [ContractTemplateService]
})
export class ContractTemplateModule { }
