import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserAuthority } from './Authority.entity';

@Entity({ name: 'user', schema: "pet_pet" })
export class User {
  @PrimaryGeneratedColumn('uuid')
  userid: string;

  @Column("varchar", { name: "user_name", comment: "用户名", length: 50 })
  username: string;

  @Column("varchar", { name: "password", comment: "用户密码", length: 20 })
  password: string;

  @Column("int", { name: "user_type", comment: "用户类型" })
  usertype: number;

  @Column("varchar", { name: "phone", comment: "手机号码", length: 11 })
  phone: number;

  @Column("int", { name: "gender", comment: "性别" })
  gender: number;

  @Column("date", { name: "birthday", comment: "出生日期", nullable: true })
  birthday: Date | null;

  @Column("varchar", { name: "avatar", comment: "头像", length: 255, nullable: true })
  avatar: string;

  @CreateDateColumn({ name: "create_time", comment: "创建时间", type: "datetime" })
  createtime: Date;

  @UpdateDateColumn({ name: "update_time", comment: "更新时间", type: "datetime" })
  updatetime: Date;

  // @JoinColumn()
  // @OneToOne(() => UserAuthority, {
  //   cascade: true,
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE'
  // })
  // UserAuthority: UserAuthority;
}