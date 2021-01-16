import { ContractChecklist } from './../contract-checklist/contract-checklist.entity';
import { ContractTerm } from './../contract-term/contract-term.entity';
import { Contract } from './../contracts/contracts.entity';
import {
  BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, ManyToMany,
  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany
} from "typeorm";
import { Category } from "src/category/category.entity";
import { SavedChecklistItem } from '../saved-checklist-items/saved-checklist-items.entity';
import { InspectionChecklistComment } from '../inspection-checklist-comment/inspection-checklist-comment.entity';
import { InspectionChecklistProduct } from '../inspection-checklist-product/inspection-checklist-product.entity';

@Entity({ synchronize: true })
export class ContractCategory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  category_id: number;

  @CreateDateColumn()
  created_at: string;

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Contract, p => p.contract_category, 
  { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;

  @OneToMany(() => ContractTerm, t => t.contract_category, { onDelete: 'CASCADE' })
  terms: ContractTerm[];

  @Column({ nullable: true })
  position: number;

  @OneToMany(() => SavedChecklistItem, c => c.contract_category,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  checklist_category: SavedChecklistItem[];

  @OneToMany(() => InspectionChecklistComment, ct => ct.contract_category,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  inspection_checklist_comment: InspectionChecklistComment[];

  @OneToMany(() => InspectionChecklistProduct, ct => ct.contract_category,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  inspection_checklist_product: InspectionChecklistProduct[];
}
