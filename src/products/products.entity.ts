import { ContractProduct } from './../contract-products/contract-products.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn } from "typeorm";
import { VenueProducts } from 'src/venues-products/venue-products.entity';

@Entity({synchronize: false })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  product_name: string;

  @Column({ type: 'decimal', scale: 2, nullable: true })
  pos: number;

  @CreateDateColumn()
  created_at: string;

  @ManyToOne(() => Product, p => p.parent, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Product;

  @OneToMany(() => ContractProduct, cp => cp.parent, { nullable: true })
  contract_parent: ContractProduct;

  @OneToMany(() => ContractProduct, cp => cp.child, { nullable: true })
  contract_child: ContractProduct;

  @OneToMany(() => VenueProducts, vp => vp.product)
  venue_products: VenueProducts;
}