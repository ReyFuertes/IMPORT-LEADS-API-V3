import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn } from "typeorm";
import { SavedChecklist } from 'src/saved-checklist/saved-checklist.entity';
import { ContractProduct } from "src/contract-products/contract-products.entity";
import { ContractCategory } from "src/contract-category/contract-category.entity";
import { ContractTerm } from "src/contract-term/contract-term.entity";

@Entity({ synchronize: false })
export class SavedChecklistItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @ManyToOne(() => SavedChecklist, c => c.checklist_items,
    { eager: true, nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'saved_checklist_id' })
  saved_checklist: SavedChecklist;

  @ManyToOne(() => ContractProduct, c => c.checklist_product,
    { eager: true, nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_product_id' })
  contract_product: ContractProduct;

  @ManyToOne(() => ContractCategory, c => c.checklist_category,
    { eager: true, nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_category_id' })
  contract_category: ContractCategory;

  @ManyToOne(() => ContractTerm, c => c.checklist_term,
    { eager: true, nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_category_term_id' })
  contract_term: ContractTerm;
}