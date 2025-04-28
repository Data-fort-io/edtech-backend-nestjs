import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { Courses } from './courses.entity';

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
  @ManyToOne(() => Users, (user) => user.personalNotifications, {
    nullable: true,
  })
  user: Users;

  //Established a many to one relationship with the courses table
  // if the notification if for student of a particular course
  @ManyToOne(() => Courses, (course) => course.courseNotifications, {
    nullable: true,
  })
  course: Courses;
}
