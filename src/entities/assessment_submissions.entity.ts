import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Assessments } from './assessments.entity';
import { Users } from './user.entity';
import { Leadership_boards } from './leadership_boards.entity';

@Entity()
export class Assessments_submissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  score: number;

  // established a many to one relationship with the assessment table
  @ManyToOne(
    () => Assessments,
    (assessment) => assessment.assessment_submission,
  )
  assessment: Assessments;

  //Established a many to one relationship with the assessment table
  @ManyToOne(() => Users, (user) => user.assessment_submitted)
  user: Users;

  // Establish aconnection with the leaderboard
  @OneToOne(
    () => Leadership_boards,
    (leaderboard) => leaderboard.assessment_submission,
    {
      nullable: false,
    },
  )
  leaderboard: Leadership_boards;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  submitedAt: Date;
}
