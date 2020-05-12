import { Contract } from './../contracts/contracts.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity()
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

  @ManyToOne(() => Contract, c => c.images)
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;
}