import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Transaction} from "./transaction";
import {IsEmail, Length} from "class-validator";

@Entity()
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 64, {message: ((value, min, max) => `Имя должно быть длинее ${min} и короче ${max}`)})
  name: string;

  @Column({nullable: true})
  phoneNumber: string;

  @Column({nullable: true})
  email: string;

  @OneToMany(type => Transaction, transaction => transaction.guest)
  transactions: Transaction[]
}