import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Waiter} from "./waiter";


@Entity()
export class Institution {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    averageRating: number;

    @Column()
    description: string;

    @OneToMany(type => Waiter, waiter => waiter.institution)
    waiters: Waiter[]
}