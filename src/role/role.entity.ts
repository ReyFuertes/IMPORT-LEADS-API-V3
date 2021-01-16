import { BaseEntity, PrimaryGeneratedColumn, Generated, Column, Entity, Unique, OneToMany } from "typeorm";
import { UserRole } from '../user-role/user-role.entity';

@Entity({ synchronize: true })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  role_name: string;

  @Column({ nullable: true })
  level: number;

  @OneToMany(() => UserRole, c => c.user, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  user_role: UserRole;
}
