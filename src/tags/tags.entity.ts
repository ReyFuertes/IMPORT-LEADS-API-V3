import { TagQuestion } from './../tag-questions/tag-questions.entity';
import { ContractTerm } from './../contract-term/contract-term.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  tag_name: string;

  @Column({ nullable: true })
  test: string;

  @OneToMany(() => ContractTerm, ct => ct.contract_tag)
  contract_term: ContractTerm;

  @OneToMany(() => TagQuestion, ct => ct.tag)
  questions: TagQuestion;
}
