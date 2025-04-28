import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Assessments_submissions } from './assessment_submissions.entity';
import { Courses } from './courses.entity';

Entity();
export class Assessments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  title: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  type: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  instruction: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  total_score: number;

  //Established a many to many relationship with the course table
  @ManyToMany(() => Courses, (course) => course.assessments)
  courses: Courses[];

  // Established a one to many relationship with the assessment submission table
  @OneToMany(
    () => Assessments_submissions,
    (assessments_submissions) => assessments_submissions.assessment,
  )
  assessment_submission: Assessments[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  submitedAt: Date;
}
