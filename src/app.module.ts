import { ContractChecklistModule } from './contract-checklist/contract-checklist.module';
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
import { VenueProductsModule } from './venues-products/venue-products.module';
import { SavedChecklistItemModule } from './saved-checklist-items/saved-checklist-items.module';
import { SavedChecklistModule } from './saved-checklist/saved-checklist.module';
import { AuthModule } from './auth/auth.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UsersModule } from './user/user.module';
import { AccessModule } from './access/access.module';
import { UserAccessModule } from './user-access/user-access.module';
import { UserRoleModule } from './user-role/user-role.module';
import { RoleModule } from './role/role.module';
import { InspectionModule } from './inspection/inspection.module';
import { InspectionChecklistRunModule } from './inspection-checklist-run/inspection-checklist-run.module';
import { InspectionRuntimeModule } from './inspection-runtime/inspection-runtime.module';
import { InspectionChecklistCommentModule } from './inspection-checklist-comment/inspection-checklist-comment.module';
import { InspectionChecklistImageModule } from './inspection-checklist-image/inspection-checklist-image.module';
import { InspectionChecklistProductModule } from './inspection-checklist-product/inspection-checklist-product.module';
import { InspectionChecklistReportModule } from './inspection-checklist-report/inspection-checklist-report.module';
import { ContractTemplateModule } from './contract-template/contract-template.module';
import { CategoryTemplateModule } from './category-template/category-template.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topsecretbenbooterkooper',
      signOptions: {
        expiresIn: 3600
      }
    }),
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
    ContractTermModule,
    VenueProductsModule,
    ContractChecklistModule,
    SavedChecklistItemModule,
    SavedChecklistModule,
    AuthModule,
    UserProfileModule,
    UsersModule,
    AccessModule,
    UserAccessModule,
    UserRoleModule,
    RoleModule,
    InspectionModule,
    InspectionChecklistRunModule,
    InspectionRuntimeModule,
    InspectionChecklistCommentModule,
    InspectionChecklistImageModule,
    InspectionChecklistProductModule,
    InspectionChecklistReportModule,
    ContractTemplateModule,
    CategoryTemplateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
