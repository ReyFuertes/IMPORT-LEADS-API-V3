import { Tag } from './../tags/tags.entity';
import { ContractCategory } from './../contract-category/contract-category.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn, JoinTable } from "typeorm";

@Entity({ synchronize: true })
export class ContractTerm extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  term_name: string;

  @Column({ nullable: true })
  term_description: string;

  @ManyToOne(() => ContractCategory, cc => cc.category)
  @JoinColumn({ name: 'contract_category_id' })
  contract_category: ContractCategory;

  @ManyToOne(() => Tag, ct => ct.contract_term)
  @JoinColumn({ name: 'tag_id' })
  contract_tag: Tag;
}