import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn } from "typeorm";
import { SavedChecklist } from "src/saved-checklist/saved-checklist.entity";
import { InspectionRuntime } from "src/inspection-runtime/inspection-runtime.entity";
import { InspectionChecklistComment } from "src/inspection-checklist-comment/inspection-checklist-comment.entity";
import { InspectionChecklistImage } from "src/inspection-checklist-image/inspection-checklist-image.entity";
import { InspectionChecklistProduct } from "src/inspection-checklist-product/inspection-checklist-product.entity";
import { Inspection } from "src/inspection/inspection.entity";

@Entity({ synchronize: false })
export class InspectionChecklistRun extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @CreateDateColumn()
  created_at: string;

  @Column({ nullable: true })
  saved_checklist_id: string;

  @Column({ nullable: true })
  run_status: string;

  @ManyToOne(() => Inspection, cp => cp.inspection_checklist_run,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inspection_id' })
  inspection: Inspection;

  @ManyToOne(() => SavedChecklist, cp => cp.inspection_checklist_run,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'saved_checklist_id' })
  saved_checklist: SavedChecklist;

  @OneToMany(() => InspectionChecklistComment, cp => cp.inspection_checklist_run,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    inspection_checklist_comment: InspectionChecklistComment[];

  @OneToMany(() => InspectionChecklistImage, cp => cp.inspection_checklist_run,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  inspection_checklist_image: InspectionChecklistImage;

  @OneToMany(() => InspectionChecklistProduct, cp => cp.inspection_checklist_run,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  inspection_checklist_product: InspectionChecklistProduct;

}