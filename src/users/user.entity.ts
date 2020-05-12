import { Contract } from './../contracts/contracts.entity';
import { BaseEntity, PrimaryGeneratedColumn, Generated, ManyToOne, OneToOne, Column, Entity, JoinColumn, ManyToMany, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;
  @Column({ nullable: true })
  
  firstname: string;
  @Column({ nullable: true })

  lastname: string
  @Column({ nullable: true })
  email: string;

  @OneToMany(() => Contract, c => c.user)
  contract: Contract;

  // @OneToMany(() => UserRole, role => role.user)
  // role: UserRole;
}

@Entity()
export class UserRole extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;
  @Column()
  role: string;

  // @ManyToOne(() => User, user => user.role)
  // user: User;
}