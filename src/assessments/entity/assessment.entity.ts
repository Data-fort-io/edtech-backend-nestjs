import { Assessments_submissions } from 'src/assessment_submission/entity/assessment_submission.entity';
import { Courses } from 'src/courses/entity/courses.entity copy';
import { Questions } from 'src/entities/questions.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
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

  //Established a one to one relationship with the course table
  @OneToOne(() => Courses, (course) => course.assessment)
  course: Courses;

  //Establish a one to many connection with the questions table
  @OneToMany(()=> Questions, (question)=> question.assessment, {
    cascade: true
  })
  questions: Questions[]

  
  // Established a one to many relationship with the assessment submission table
  @OneToMany(() => Assessments_submissions, (assessments_submissions) => assessments_submissions.assessment,)
  assessment_submissions: Assessments_submissions[];
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  submitedAt: Date;
}

