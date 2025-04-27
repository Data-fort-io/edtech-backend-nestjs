import { Track } from "src/common/enums/track.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Courses{

    @PrimaryGeneratedColumn()
    id:Number

    @Column({
            type: "varchar",
            nullable: true,
        })
    title: string;

    @Column({
        type: "number",
        nullable: false
    })
    duration: number;

    @Column({
        type: "simple-array",
        nullable: false
    })
    objectives: string[];

    @Column({
        type: "varchar",
        nullable: false
    })
    track: Track    

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    submitedAt: Date
}