import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn } from "typeorm";
import { InspectionChecklistRun } from "src/inspection-checklist-run/inspection-checklist-run.entity";
import { ContractProduct } from "src/contract-products/contract-products.entity";
import { ContractTerm } from "src/contract-term/contract-term.entity";
import { ContractCategory } from "src/contract-category/contract-category.entity";
import { ContractChecklist } from "src/contract-checklist/contract-checklist.entity";
import { SavedChecklist } from "src/saved-checklist/saved-checklist.entity";

@Entity({ synchronize: false })
export class InspectionChecklistProduct extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  // @CreateDateColumn()
  // created_at: string;

  @ManyToOne(() => SavedChecklist, cp => cp.inspection_checklist_product,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'saved_checklist_id' })
  saved_checklist: SavedChecklist;

  @ManyToOne(() => ContractProduct, cp => cp.inspection_checklist_product,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_product_id' })
  contract_product: ContractProduct;

  @ManyToOne(() => ContractTerm, cp => cp.inspection_checklist_product,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_term_id' })
  contract_term: ContractTerm;

  @ManyToOne(() => ContractCategory, cp => cp.inspection_checklist_product,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_category_id' })
  contract_category: ContractCategory;

  @ManyToOne(() => InspectionChecklistRun, cp => cp.inspection_checklist_product,
    { eager: true, nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inspection_checklist_run_id' })
  inspection_checklist_run: InspectionChecklistRun;

}