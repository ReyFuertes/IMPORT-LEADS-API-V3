import { ContractTerm } from "src/contract-term/contract-term.entity";
import { InspectionChecklistRun } from "src/inspection-checklist-run/inspection-checklist-run.entity";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity({ synchronize: true })
export class InspectionChecklistImage extends BaseEntity {
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
  contract_term_id: string;

  @CreateDateColumn()
  created_at: string;

  @ManyToOne(() => InspectionChecklistRun, cp => cp.inspection_checklist_image,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inspection_checklist_run_id' })
  inspection_checklist_run: InspectionChecklistRun;

  @ManyToOne(() => ContractTerm, cp => cp.inspection_checklist_image,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_term_id' })
  contract_term: ContractTerm;
}
