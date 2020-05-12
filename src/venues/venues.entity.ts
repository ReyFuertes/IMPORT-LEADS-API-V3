import { Contract } from './../contracts/contracts.entity';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Generated, OneToOne, Column, OneToMany } from "typeorm";

@Entity()
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

  @OneToMany(() => Contract, c => c.venue)
  contract: Contract;

  // @OneToMany(type => Product, product => product.venue)
  // products: Product[];
}