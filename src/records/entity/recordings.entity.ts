import { Courses } from 'src/courses/entity/courses.entity copy';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity()
export class Records {
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

  @ManyToOne(() => Courses, (course) => course.record)
  course: Courses;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  submitedAt: Date;
}