import { ContractTermService } from './contract-term.service';
import { ContractTermRepository } from './contract-term.repository';
import { ContractTermController } from './contract-term.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([ContractTermRepository])],
  controllers: [ContractTermController],
  providers: [ContractTermService]
})
export class ContractTermModule { }
