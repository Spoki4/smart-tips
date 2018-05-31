import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Waiter} from "./waiter";

@Entity()
export class Cafe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({default: ""})
  description: string;

  @OneToMany(type => Waiter, waiter => waiter.cafe, {cascade: ["remove"]})
  waiters: Waiter[]
}