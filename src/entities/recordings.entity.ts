import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Recordings{
    @PrimaryGeneratedColumn()
    id: Number

    @Column({
        type: "varchar",
        nullable: false,
    })
    url: string

    @Column({
        type: 'number',
        nullable: false
    })
    duration: number

    // a one to one relationship with the course recorded

    
    @CreateDateColumn()
    createdAt: Date;
        
    @UpdateDateColumn()
    submitedAt: Date
}