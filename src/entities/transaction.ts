import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Waiter} from "./waiter";
import {Guest} from "./guest";
import {Review} from "./review";


@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    sum: number;

    @ManyToOne(type => Waiter)
    waiter: Waiter;

    @ManyToOne(type => Guest)
    guest: Guest;

    @OneToOne(type => Review)
    @JoinColumn()
    review: Review;
}