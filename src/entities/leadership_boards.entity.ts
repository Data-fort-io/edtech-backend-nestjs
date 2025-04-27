import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Leadership_boards{
    @PrimaryGeneratedColumn()
    id: Number

    @Column({
        type: "number",
        nullable: false
    })
    percentage: number

    // one on one relationship with the user who has the course

    // one to one relationship with the course
    
    @CreateDateColumn()
    createdAt: Date;
        
    @UpdateDateColumn()
    submitedAt: Date
}