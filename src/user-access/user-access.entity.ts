import { Contract } from '../contracts/contracts.entity';
import { BaseEntity, PrimaryGeneratedColumn, Generated, Column, Entity, Unique, ManyToOne, JoinColumn } from "typeorm";
import { User } from '../user/user.entity';
import { Access } from '../access/access.entity';

@Entity({ synchronize: true })
export class UserAccess extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @ManyToOne(() => User, c => c.user_access, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Access, c => c.user_access, { eager: true, nullable: true, onDelete: 'CASCADE' })
  access: Access;
}
