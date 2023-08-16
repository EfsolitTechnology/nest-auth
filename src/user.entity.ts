import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mobile: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({nullable:true})
    email: string;

    @Column({nullable:true})
    otp: string;
}
