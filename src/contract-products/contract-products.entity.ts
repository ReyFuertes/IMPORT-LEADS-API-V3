import { ContractChecklist } from './../contract-checklist/contract-checklist.entity';
import { Contract } from './../contracts/contracts.entity';
import { Product } from './../products/products.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Generated, OneToOne, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { SavedChecklistItem } from 'src/saved-checklist-items/saved-checklist-items.entity';
import { InspectionChecklistComment } from 'src/inspection-checklist-comment/inspection-checklist-comment.entity';
import { InspectionChecklistProduct } from 'src/inspection-checklist-product/inspection-checklist-product.entity';
@Entity({ synchronize: false })
export class ContractProduct extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  qty?: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
  cost?: string;

  @Column({ nullable: true })
  term_description?: string;

  // @Column({ nullable: true })
  // child_id?: string;

  // @Column({ nullable: true })
  // parent_id?: string;

  @OneToMany(() => SavedChecklistItem, ct => ct.contract_product,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  checklist_product: SavedChecklistItem;

  @OneToMany(() => InspectionChecklistComment, ic => ic.contract_product,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  inspection_checklist_comment: InspectionChecklistComment;

  @ManyToOne(() => Product, p => p.contract_parent, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Product;

  @ManyToOne(() => Product, p => p.contract_child, { nullable: true })
  @JoinColumn({ name: 'child_id' })
  child: Product;

  @ManyToOne(() => Contract, c => c.contract_products, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;

  @OneToMany(() => InspectionChecklistProduct, i => i.contract_product,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  inspection_checklist_product: InspectionChecklistProduct;

  @CreateDateColumn()
  created_at: string;

}