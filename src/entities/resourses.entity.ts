import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Resourses{
    @PrimaryGeneratedColumn()
    id: Number

    @Column({
        type: "varchar",
        nullable: false
    })
    title: string;

    @Column({
        type: "varchar",
        nullable: false
    })
    url: string

    //a many to many relationship with the courses

    
    @CreateDateColumn()
    createdAt: Date;
        
    @UpdateDateColumn()
    submitedAt: Date
}