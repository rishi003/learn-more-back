import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userName: string

    @Column()
    firstName: string

    @Column() 
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, parseInt(process.env.SALT_ROUNDS))
    }

}