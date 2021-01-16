import { Venue } from './../venues/venues.entity';
import { Contract } from './../contracts/contracts.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { ContractTerm } from '../contract-term/contract-term.entity';

@Entity({synchronize: true })
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;
  @Column({ nullable: true })
  filename: string;

  @Column({ nullable: true })
  position: number;

  @Column({ nullable: true })
  size: number;

  @Column({ nullable: true })
  mimetype: string;

  @Column({ nullable: true })
  contract_id: string;

  @Column({ nullable: true })
  venue_id: string;

  @Column({ nullable: true })
  term_id: string;

  @Column({ nullable: true, name: 'dataImage' })
  dataImage: string;

  @ManyToOne(() => Contract, c => c.images, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;

  @OneToOne(() => Venue, c => c.image, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @ManyToOne(() => ContractTerm, c => c.images, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'term_id' })
  term: ContractTerm;
}