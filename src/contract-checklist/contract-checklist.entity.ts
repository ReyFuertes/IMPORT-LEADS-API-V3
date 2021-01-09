import { ContractProduct } from './../contract-products/contract-products.entity';
import { Contract } from './../contracts/contracts.entity';
import { ContractCategory } from './../contract-category/contract-category.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Generated, OneToOne, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { ContractTerm } from 'src/contract-term/contract-term.entity';
import { SavedChecklistItem } from 'src/saved-checklist-items/saved-checklist-items.entity';
import { SavedChecklist } from 'src/saved-checklist/saved-checklist.entity';

@Entity({ synchronize: false })
export class ContractChecklist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  // @ManyToOne(() => Contract, c => c.contract_checklist,
  //   { eager: true, nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'contract_id' })
  // checklist_contract: Contract;

  // @ManyToOne(() => ContractProduct, c => c.product_checklist,
  //   { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'contract_product_id' })
  // checklist_product: ContractProduct;

  // @ManyToOne(() => ContractCategory, c => c.contract_category,
  //   { eager: true, nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'contract_category_id' })
  // checklist_category: ContractCategory;

  // @ManyToOne(() => ContractTerm, c => c.contract_category_term,
  //   { eager: true, nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'contract_category_term_id' })
  // checklist_term: ContractTerm;

  // @OneToMany(() => SavedChecklistItem, cp => cp.checklist_items,
  //   { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  //   checklist_items: SavedChecklistItem;

  // @Column({ nullable: true })
  // checklist_name: string;

  // @Column({ nullable: true })
  // desired_run_date: string;

  // @Column({ nullable: true }) /* just accept a string since we do not have users */
  // assigned_to: string;

  @CreateDateColumn()
  created_at: string;

}