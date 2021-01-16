import { Tag } from './../tags/tags.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";

@Entity({synchronize: true })
export class TagQuestion extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  question_name: string;

  @ManyToOne(() => Tag, tq => tq.questions)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}