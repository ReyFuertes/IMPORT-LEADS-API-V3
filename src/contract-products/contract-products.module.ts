import { CPService } from './contract-products.service';
import { CPController } from './contract-products.controller';
import { CPRepository } from './../contract-products/contract-products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([CPRepository])],
  controllers: [CPController],
  providers: [CPService]
})
export class ContractProductsModule {}
