import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

Entity()
export class Assessments{
    @PrimaryGeneratedColumn()
    id: Number

    @Column({
        type: "varchar",
        nullable: true,
    })
    title: string

    @Column({
        type: "varchar",
        nullable: false
    })
    type: string;

    @Column({
        type: "text",
        nullable: false,
        length: 500
    })
    instruction: string;

    @Column({
        type: "number",
        nullable: false
    })
    total_score: number;

    // a many to one relationship with the course

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    submitedAt: Date

    

}