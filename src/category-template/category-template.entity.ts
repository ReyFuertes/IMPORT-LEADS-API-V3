import { Category } from "src/category/category.entity";
import { Contract } from "src/contracts/contracts.entity";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity({ synchronize: false })
export class CategoryTemplate extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Category, cp => cp.category_template,
    { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Contract, cp => cp.category_template,
    { nullable: true })
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;
}
