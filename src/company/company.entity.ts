import { User } from "src/user/user.entity";
import {
  BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, OneToMany
} from "typeorm";

@Entity({ synchronize: false })
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  company_name: string;

  @OneToMany(() => User, c => c.company,
    { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  user: User;
}
