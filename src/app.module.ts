import { ContractTermModule } from './contract-term/contract-term.module';
import { TagQuestionsModule } from './tag-questions/tag-questions.module';
import { TagsModule } from './tags/tags.module';
import { ContractCategoryModule } from './contract-category/contract-category.module';
import { CategoryModule } from './category/category.module';
import { ContractProductsModule } from './contract-products/contract-products.module';
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';
import { VenuesModule } from './venues/venues.module';
import { UploadModule } from './upload/upload.module';
import { Module } from '@nestjs/common';
import { ContractsModule } from './contracts/contracts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ContractsModule,
    UploadModule,
    VenuesModule,
    ImagesModule,
    ProductsModule,
    ContractProductsModule,
    CategoryModule,
    ContractCategoryModule,
    TagsModule,
    TagQuestionsModule,
    ContractTermModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
