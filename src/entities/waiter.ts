import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Institution} from "./intitution";
import {Transaction} from "./transaction";

@Entity()
export class Waiter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @ManyToOne(type => Institution, institution => institution.waiters)
    institution: Institution;

    @OneToMany(type => Transaction, transaction => transaction.waiter)
    transactions: Transaction[];
}