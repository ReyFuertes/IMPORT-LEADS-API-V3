import { ContractChecklist } from './../contract-checklist/contract-checklist.entity';
import { Image } from '../images/image.entity';
import { Tag } from './../tags/tags.entity';
import { ContractCategory } from './../contract-category/contract-category.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { SavedChecklistItem } from '../saved-checklist-items/saved-checklist-items.entity';
import { InspectionChecklistComment } from '../inspection-checklist-comment/inspection-checklist-comment.entity';
import { InspectionChecklistImage } from '../inspection-checklist-image/inspection-checklist-image.entity';
import { InspectionChecklistProduct } from '../inspection-checklist-product/inspection-checklist-product.entity';

@Entity({ synchronize: true })
export class ContractTerm extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  term_name: string;

  @Column({ nullable: true })
  term_description: string;

  @OneToMany(() => Image, image => image.term, { nullable: true, onDelete: 'CASCADE' })
  images: Image[];

  @ManyToOne(() => ContractCategory, cc => cc.category, { onUpdate: 'CASCADE', eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_category_id' })
  contract_category: ContractCategory;

  @OneToMany(() => SavedChecklistItem, ct => ct.contract_term,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  checklist_term: SavedChecklistItem[];

  @ManyToOne(() => Tag, ct => ct.contract_term,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tag_id' })
  contract_tag: Tag;

  @OneToMany(() => InspectionChecklistComment, ct => ct.contract_term,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  inspection_checklist_comment: InspectionChecklistComment[];

  @OneToMany(() => InspectionChecklistImage, ct => ct.contract_term,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  inspection_checklist_image: InspectionChecklistImage[];

  @OneToMany(() => InspectionChecklistProduct, ct => ct.contract_term,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  inspection_checklist_product: InspectionChecklistProduct[];
}