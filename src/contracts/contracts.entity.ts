import { ContractProduct } from './../contract-products/contract-products.entity';
import { Product } from './../products/products.entity';
import { Venue } from 'src/venues/venues.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Generated, OneToOne, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { Image } from 'src/images/image.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Contract extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  contract_name: string;

  @Column('timestamp', { nullable: true })
  start_date: Date;

  @Column('timestamp', { nullable: true })
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

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: number;

  @ManyToOne(() => Venue, v => v.contract)
  @JoinColumn({ name: 'venue_id' })
  public venue: Venue;

  @OneToMany(() => Image, image => image.contract, {  cascade: true, eager: true })
  images: Image[];

  @OneToMany(() => ContractProduct, v => v.contract)
  contract_products: ContractProduct;

  @ManyToOne(() => User, v => v.contract)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

