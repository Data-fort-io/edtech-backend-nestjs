/*
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Courses } from './courses.entity';

@Entity()
export class Recordings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  url: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  duration: number;

  //Established a one to one relationship with the course recorded
  @ManyToOne(() => Courses, (course) => course.record)
  course: Courses;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  submitedAt: Date;
}
*/