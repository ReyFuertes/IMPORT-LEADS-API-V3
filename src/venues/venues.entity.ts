import { Image } from './../images/image.entity';
import { Contract } from './../contracts/contracts.entity';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Generated, Column, OneToMany, ManyToOne, OneToOne } from "typeorm";
import { VenueProducts } from '../venues-products/venue-products.entity';

@Entity({synchronize: true })
export class Venue extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  inspections: string;

  @Column({ nullable: true })
  avg_pass_fail: string;

  @Column({ nullable: true })
  rating: string;

  @Column({ nullable: true })
  contact: string;

  @Column({ nullable: true })
  phone: string;

  @OneToOne(() => Image, image => image.venue, { nullable: true, onDelete: 'CASCADE', eager: true })
  image: Image;

  @OneToMany(() => Contract, v => v.venue, { nullable: true })
  contract: Contract;

  @OneToMany(() => VenueProducts, vp => vp.venue, { nullable: true })
  venue_products: VenueProducts;

  // @OneToMany(type => Product, product => product.venue)
  // products: Product[];
}