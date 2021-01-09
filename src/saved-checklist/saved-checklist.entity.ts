import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn } from "typeorm";
import { SavedChecklistItem } from "src/saved-checklist-items/saved-checklist-items.entity";
import { Contract } from "src/contracts/contracts.entity";
import { User } from "src/user/user.entity";
import { Inspection } from "src/inspection/inspection.entity";
import { InspectionChecklistRun } from "src/inspection-checklist-run/inspection-checklist-run.entity";
import { InspectionChecklistComment } from "src/inspection-checklist-comment/inspection-checklist-comment.entity";
import { InspectionChecklistProduct } from "src/inspection-checklist-product/inspection-checklist-product.entity";

@Entity({ synchronize: true })
export class SavedChecklist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  checklist_name: string;

  @Column({ nullable: true })
  desired_run_date: string;

  @Column({ nullable: true })
  user_id: string;

  @CreateDateColumn()
  created_at: string;

  @ManyToOne(() => Contract, v => v.saved_checklist, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'contract_id' })
  checklist_contract: Contract;

  @OneToMany(() => InspectionChecklistRun, cp => cp.saved_checklist,
    { eager: true, nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    inspection_checklist_run: InspectionChecklistRun[];

  @OneToMany(() => SavedChecklistItem, cp => cp.saved_checklist,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  checklist_items: SavedChecklistItem[];

  @ManyToOne(() => User, cp => cp.saved_checklist,
    { eager: true, nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Inspection, cp => cp.saved_checklist,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  inspection: Inspection[];

  @OneToMany(() => InspectionChecklistComment, cp => cp.saved_checklist,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    inspection_checklist_comment: InspectionChecklistComment[];

  @OneToMany(() => InspectionChecklistProduct, cp => cp.saved_checklist,
  { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  inspection_checklist_product: InspectionChecklistProduct[];

}