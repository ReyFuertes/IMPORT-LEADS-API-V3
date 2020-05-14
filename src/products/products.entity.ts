import { ContractProduct } from './../contract-products/contract-products.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  product_name: string;

  @Column({ nullable: true })
  qty: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
  cost: number;

  @Column({ type: 'decimal', scale: 2, nullable: true })
  pos: number;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: number;

  @ManyToOne(() => Product, p => p.id, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent: Product;

  @OneToMany(() => ContractProduct, cp => cp.parent, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  contract_parent: ContractProduct;

  @OneToMany(() => ContractProduct, cp => cp.child, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  contract_child: ContractProduct;
}

// @Entity()
export class ProductTerm extends BaseEntity {
  // @PrimaryGeneratedColumn('uuid')
  // @Generated('uuid')
  // id: string;

  // @OneToOne(() => Tag, tag => tag.product_term)
  // tag: Tag;
  // @ManyToOne(() => ProductCategory, category => category.term)
  // product_category: ProductCategory;
}

export class ProductCategory extends BaseEntity {
  // @PrimaryGeneratedColumn('uuid')
  // @Generated('uuid')
  // id: string;
  // @Column({ nullable: true })
  // name: string;

  // @OneToMany(() => ProductTerm, term => term.product_category)  
  // term: ProductTerm[];
}