import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Transaction} from "./transaction";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "real"})
  rating: number;

  @Column()
  comment: string;

  @OneToOne(type => Transaction, transaction => transaction.review)
  transaction: Transaction;
}