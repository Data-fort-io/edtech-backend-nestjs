

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Assessments } from 'src/assessments/entity/assessment.entity';
import { Users } from 'src/users/user.entity';
//import { Leadership_boards } from './leadership_boards.entity';

@Entity()
export class Assessments_submissions {
  @PrimaryGeneratedColumn()
  id: number;

  //assessment answers
  @Column({
    type: "char",
    nullable: true,
    array: true
  })
  answers: string[]

  // established a many to one relationship with the assessment table
  @ManyToOne(()=> Assessments, (assessment)=> assessment.assessment_submissions)
  assessment: Assessments;

    //Established a many to one relationship with the assessment table
  @ManyToOne(() => Users, (user) => user.assessment_submitted)
  user: Users;

  @Column({
    type: 'integer',
    nullable: true,
  })
  score?: number;



  
    /*
    // Establish aconnection with the leaderboard
    @OneToOne(
        () => Leadership_boards,
        (leaderboard) => leaderboard.assessment_submission,
        {
        nullable: false,
        },
    )
    leaderboard: Leadership_boards;
    */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  submitedAt: Date;
}
