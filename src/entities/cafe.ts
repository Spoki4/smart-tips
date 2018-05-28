import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Waiter} from "./waiter";
import {Length} from "class-validator";

@Entity()
export class Cafe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 64, {message: (value, min, max) => `Название должно быть длинее ${min} и короче ${max}`})
  name: string;

  @Column()
  @Length(5, 128, {message: (value, min, max) => `Адрес должен быть длинее ${min} и короче ${max}`})
  address: string;

  @Column({nullable: true})
  rating: number;

  @Column({default: ""})
  description: string;

  @OneToMany(type => Waiter, waiter => waiter.cafe)
  waiters: Waiter[]
}