import { string } from "joi";
import { type } from "os";
import { Profiles } from "src/profiles/profile.entity";
import { Users } from "src/users/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tracks{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        nullable: false,
        length: 20,
        unique: true
    })
    name: string

    @ManyToMany(()=>  Users, (user)=> user.track, {
        cascade: true
    })
    user: Users[]
}