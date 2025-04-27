import { Gender } from "src/common/enums/gender.enum";
import { Track } from "src/common/enums/track.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Profiles{
    @PrimaryGeneratedColumn()
    id: Number

    @Column({
        type: "varchar",
        length: 150,
        nullable: true,       
    })
    fullname: string

    @Column({
        type: "text",
        nullable: true,
        length: 500,    
    })
    bio: string;

    @Column({
        type: "varchar",
        nullable: true,
        length: 100,    
    })
    image: string;

    @Column({
        type: "simple-array",
        nullable: true,    
    })
    track: Track[];

    @Column({
        type: "varchar",
        nullable: true   
    })
    gender: Gender;

    @Column({
        type: "varchar",
        nullable: true,
        length: 15
    })
    dob: string

    @UpdateDateColumn()
    updatedAt: Date;

}