import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Courses } from './courses.entity';

@Entity()
export class Resourses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  submitedAt: Date;

  //Established a many to many relationship with the courses
  @ManyToMany(() => Courses, (course) => course.resources)
  courses: Courses[];
}
