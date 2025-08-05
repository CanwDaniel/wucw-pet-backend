import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: "user_authority", schema: "pet_pet" })
export class UserAuthority {
  @PrimaryColumn("int", { name: "id" })
  id: number;

  @Column("varchar", { name: "authority", length: 50 })
  authority: string;
}