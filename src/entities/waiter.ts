import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Cafe} from "./cafe";
import {Transaction} from "./transaction";

@Entity()
export class Waiter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @ManyToOne(type => Cafe, cafe => cafe.waiters)
  cafe: Cafe;

  @OneToMany(type => Transaction, transaction => transaction.waiter)
  transactions: Transaction[];
}