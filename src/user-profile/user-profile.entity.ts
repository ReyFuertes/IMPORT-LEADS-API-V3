import { BaseEntity, PrimaryGeneratedColumn, Generated, ManyToOne, OneToOne, Column, Entity } from "typeorm";
import { User } from "src/user/user.entity";

@Entity({ synchronize: false })
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  wechatid: string;

  @Column({ nullable: true })
  qqid: string;
  
  @Column({ nullable: true })
  company_name: string;

  @Column({ nullable: true })
  company_linkedin: string;
  
  @Column({ nullable: true })
  company_address: string;
  
  @Column({ nullable: true })
  self_intro: string;
  
  @Column({ nullable: true })
  position: string;
  
  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User, c => c.user_profile, { eager: true, onDelete: 'CASCADE' })
  user: User;
}