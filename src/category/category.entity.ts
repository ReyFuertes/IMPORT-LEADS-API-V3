import { ContractCategory } from './../contract-category/contract-category.entity';
import {
  BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, ManyToMany,
  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany
} from "typeorm";
import { CategoryTemplate } from 'src/category-template/category-template.entity';

@Entity({synchronize: false })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  category_name: string;

  @OneToMany(() => ContractCategory, cc => cc.category)
  contract_category: ContractCategory;

  @OneToMany(() => CategoryTemplate, cp => cp.category,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  category_template: CategoryTemplate;
  
}