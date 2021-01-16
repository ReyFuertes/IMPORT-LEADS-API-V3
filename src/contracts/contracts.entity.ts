import { ContractProduct } from './../contract-products/contract-products.entity';
import { Venue } from '../venues/venues.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Generated, OneToOne, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { Image } from '../images/image.entity';
import { SavedChecklist } from '../saved-checklist/saved-checklist.entity';
import { User } from '../user/user.entity';
import { ContractCategory } from '../contract-category/contract-category.entity';
import { ContractTemplate } from '../contract-template/contract-template.entity';
import { CategoryTemplate } from '../category-template/category-template.entity';

@Entity({ synchronize: true })
export class Contract extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  contract_name: string;

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  delivery_date: Date;

  @Column({ nullable: true })
  details: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  responsible_person: string;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true })
  upload_date: Date;

  @Column({ nullable: true })
  venue_id: string;

  @CreateDateColumn()
  created_at: string;

  @OneToMany(() => CategoryTemplate, v => v.contract,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  category_template: CategoryTemplate;

  @OneToMany(() => ContractTemplate, v => v.contract,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  contract_template: ContractTemplate;

  @ManyToOne(() => Venue, v => v.contract, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @ManyToOne(() => ContractCategory, { onDelete: 'CASCADE' })
  contract_category: ContractCategory;

  @OneToMany(() => Image, i => i.contract, { onDelete: 'CASCADE' })
  images: Image[];

  @OneToMany(() => ContractProduct, v => v.contract, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  contract_products: ContractProduct;

  @OneToMany(() => SavedChecklist, v => v.checklist_contract)
  saved_checklist: SavedChecklist;

  @ManyToOne(() => User, v => v.contract, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

