
import { Users } from 'src/users/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  
  
  @Entity()
  export class Notifications {
    @PrimaryGeneratedColumn()
    id: Number;
  
    @Column({
      type: 'text',
      nullable: false,
    })
    message: string;
  
    @Column({
      type: 'boolean',
      nullable: false,
      default: false,
    })
    read: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    submitedAt: Date;
  
    //Established a many to one relationship with the user table
    // if the notification if for a student
    @ManyToMany(() => Users, (users)=> users.notifications)
    users: Users[]
  }
  