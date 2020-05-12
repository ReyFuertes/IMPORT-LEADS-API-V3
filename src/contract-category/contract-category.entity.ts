import { ContractTerm } from './../contract-term/contract-term.entity';
import { Contract } from './../contracts/contracts.entity';
import {
  BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, ManyToMany,
  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany
} from "typeorm";
import { Category } from "src/category/category.entity";

@Entity()
export class ContractCategory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Contract)
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;

  @OneToMany(() => ContractTerm, t => t.contract_category)
  terms: ContractTerm[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: number;
}
