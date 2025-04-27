import { status } from "src/common/enums/status.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Enrollments{
    @PrimaryGeneratedColumn()
    id: Number

    @Column({
        type: 'varchar',
        nullable: false
    })
    status: status;

    // one to many relationship with the user who enrolled

    // one to one relationship with the course enrolled for

    
    @CreateDateColumn()
    enrolledAt: Date;
        
    @UpdateDateColumn()
    submitedAt: Date

}