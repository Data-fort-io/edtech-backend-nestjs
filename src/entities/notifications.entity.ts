import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Notifications{
    @PrimaryGeneratedColumn()
    id: Number

    @Column({
        type: "text",
        nullable: false,
        length: "200"
    })
    message: string

    // a one to many relationship with the user

    
    @CreateDateColumn()
    createdAt: Date;
        
    @UpdateDateColumn()
    submitedAt: Date
}