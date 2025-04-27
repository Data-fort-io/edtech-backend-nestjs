import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        type: "varchar",
        unique: true,
        nullable: false,
        length: 100,
        
    })
    email: string;

    @Column({
        type: "varchar",
        unique: true,
        nullable: false,
        length: 100,
    })
    username: string;

    @Column({
        type: "varchar",
        nullable: false,
        length: 100,
    })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date
}