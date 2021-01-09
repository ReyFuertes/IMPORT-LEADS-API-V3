import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn } from "typeorm";
import { SavedChecklist } from "src/saved-checklist/saved-checklist.entity";
import { InspectionChecklistRun } from "src/inspection-checklist-run/inspection-checklist-run.entity";
import { InspectionRuntime } from "src/inspection-runtime/inspection-runtime.entity";

@Entity({ synchronize: false })
export class Inspection extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true, default: false })
  is_finished: boolean;

  @CreateDateColumn()
  created_at: string;

  @OneToMany(() => InspectionRuntime, cp => cp.inspection,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  inspection_runtime: InspectionRuntime[];

  @OneToMany(() => InspectionChecklistRun, cp => cp.inspection,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  inspection_checklist_run: InspectionChecklistRun[];

  @ManyToOne(() => SavedChecklist, cp => cp.inspection,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'saved_checklist_id' })
  saved_checklist: SavedChecklist;
}