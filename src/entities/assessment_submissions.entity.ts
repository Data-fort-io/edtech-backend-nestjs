import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Assessments_submissions{
    @PrimaryGeneratedColumn()
    id: Number

    @Column({
        type: "number",
        nullable: false,
    })
    score: number;

    // A one on one relationship with the assessment table

    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    submitedAt: Date
}