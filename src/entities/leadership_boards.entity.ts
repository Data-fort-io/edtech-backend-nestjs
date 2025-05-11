/*
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../users/user.entity';
import { Courses } from './courses.entity';
import { Assessments } from './assessments.entity';
import { Assessments_submissions } from './assessment_submissions.entity';

@Entity()
export class Leadership_boards {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  percentage?: number;

  // Established a one to one connection to the assessments_submission table
  @OneToOne(
    () => Assessments_submissions,
    (assessment) => assessment.leaderboard,
    {
      nullable: false,
      cascade: true,
    },
  )
  @JoinColumn()
  assessment_submission: Assessments_submissions;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  submitedAt: Date;
}
*/