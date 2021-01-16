import { Contract } from '../contracts/contracts.entity';
import { BaseEntity, PrimaryGeneratedColumn, Generated, ManyToOne, OneToOne, Column, Entity, JoinColumn, ManyToMany, OneToMany, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'
import { UserProfile } from '../user-profile/user-profile.entity';
import { UserAccess } from '../user-access/user-access.entity';
import { UserRole } from '../user-role/user-role.entity';
import { SavedChecklist } from '../saved-checklist/saved-checklist.entity';
import { Company } from '../company/company.entity';

@Entity({ synchronize: true })
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  salt: string;

  @ManyToOne(() => Company, c => c.user, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => Contract, c => c.user, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  contract: Contract;

  @OneToOne(() => UserProfile, c => c.user, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  user_profile: UserProfile;

  @OneToMany(() => UserAccess, c => c.user, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  user_access: UserAccess[];

  @OneToMany(() => UserRole, c => c.user, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  user_role: UserRole[];

  @OneToMany(() => SavedChecklist, c => c.user, { nullable: true })
  saved_checklist: SavedChecklist[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}