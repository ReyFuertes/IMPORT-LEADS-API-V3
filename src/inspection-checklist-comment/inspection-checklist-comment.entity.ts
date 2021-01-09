import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, ManyToOne, CreateDateColumn,  JoinColumn } from "typeorm";
import { InspectionChecklistRun } from "src/inspection-checklist-run/inspection-checklist-run.entity";
import { ContractTerm } from "src/contract-term/contract-term.entity";
import { ContractCategory } from "src/contract-category/contract-category.entity";
import { SavedChecklist } from "src/saved-checklist/saved-checklist.entity";
import { ContractProduct } from "src/contract-products/contract-products.entity";

@Entity({ synchronize: false })
export class InspectionChecklistComment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  verification: string;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  created_at: string;

  @ManyToOne(() => InspectionChecklistRun, cp => cp.inspection_checklist_comment,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inspection_checklist_run_id' })
  inspection_checklist_run: InspectionChecklistRun;

  @ManyToOne(() => ContractTerm, cp => cp.inspection_checklist_comment,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_term_id' })
  contract_term: ContractTerm;

  @ManyToOne(() => ContractCategory, cp => cp.inspection_checklist_comment,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_category_id' })
  contract_category: ContractCategory;

  @ManyToOne(() => ContractProduct, cp => cp.inspection_checklist_comment,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_product_id' })
  contract_product: ContractProduct;

  @ManyToOne(() => SavedChecklist, cp => cp.inspection_checklist_comment,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'saved_checklist_id' })
  saved_checklist: SavedChecklist;
}