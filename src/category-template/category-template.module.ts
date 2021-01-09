import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CategoryTemplateRepository } from './category-template.repository';
import { CategoryTemplateController } from './category-template.controller';
import { CategoryTemplateService } from './category-template.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryTemplateRepository])],
  controllers: [CategoryTemplateController],
  providers: [CategoryTemplateService]
})
export class CategoryTemplateModule { }
