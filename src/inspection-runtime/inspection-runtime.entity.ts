import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn } from "typeorm";
import { Inspection } from "src/inspection/inspection.entity";

@Entity({ synchronize: true })
export class InspectionRuntime extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  run_start: string;

  @Column({ nullable: true })
  run_end: string;

  @ManyToOne(() => Inspection, cp => cp.inspection_runtime,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inspection_id' })
  inspection: Inspection;

}