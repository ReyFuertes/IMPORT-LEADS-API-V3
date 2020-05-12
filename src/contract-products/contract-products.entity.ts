import { ManyToMany } from 'typeorm';
import { Contract } from './../contracts/contracts.entity';
import { Product } from './../products/products.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Generated, OneToOne, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
@Entity()
export class ContractProduct extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @ManyToOne(() => Product, p => p.contract_parent, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent: Product;

  @ManyToOne(() => Product, p => p.contract_child, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'child_id' })
  child: Product;

  @ManyToOne(() => Contract, c => c.contract_products, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: number;
}