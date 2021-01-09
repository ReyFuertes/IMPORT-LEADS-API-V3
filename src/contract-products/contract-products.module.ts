import { CPService } from './contract-products.service';
import { CPController } from './contract-products.controller';
import { ContractProductRepository } from './../contract-products/contract-products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([ContractProductRepository])],
  controllers: [CPController],
  providers: [CPService]
})
export class ContractProductsModule {}
