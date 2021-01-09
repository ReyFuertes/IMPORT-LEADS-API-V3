import { Contract } from '../contracts/contracts.entity';
import { BaseEntity, PrimaryGeneratedColumn, Generated, Column, Entity, Unique, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { UserAccess } from 'src/user-access/user-access.entity';

@Entity({ synchronize: false })
@Unique(['access_name'])
export class Access extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  access_name: string;

  @Column({ nullable: true })
  user_route: string;

  @ManyToOne(() => Access, p => p.id, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Access;

  @Column({ nullable: true })
  position: number;

  @OneToMany(() => UserAccess, c => c.user, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  user_access: UserAccess;
}
