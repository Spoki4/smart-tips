import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Transaction} from "./transaction";

@Entity()
export class Guest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @OneToMany(type => Transaction, transaction => transaction.guest)
    transactions: Transaction[]
}