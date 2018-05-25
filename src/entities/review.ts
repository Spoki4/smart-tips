import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @Column()
    text: string;
}