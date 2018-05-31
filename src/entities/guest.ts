import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Transaction} from "./transaction";
import {IsEmail, Length} from "class-validator";

@Entity()
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  phoneNumber: string;

  @Column({nullable: true})
  email: string;

  @OneToMany(type => Transaction, transaction => transaction.guest)
  transactions: Transaction[]
}