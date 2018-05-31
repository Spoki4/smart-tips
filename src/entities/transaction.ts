import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Waiter} from "./waiter";
import {Guest} from "./guest";
import {Review} from "./review";


@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: new Date()})
  date: Date;

  @Column()
  amount: number;

  @ManyToOne(type => Waiter, {nullable: false, onDelete: "CASCADE"})
  waiter: Waiter;

  @ManyToOne(type => Guest, {nullable: true})
  guest: Guest;

  @OneToOne(type => Review, {nullable: false, cascade: ["insert", "update", "remove"], onDelete: "CASCADE"})
  @JoinColumn()
  review: Review;
}