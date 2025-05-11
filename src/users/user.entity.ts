import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Profiles } from '../profiles/profile.entity';
/*
import { Assessments_submissions } from '../entities/assessment_submissions.entity';
import { Enrollments } from '../entities/enrollments.entity';
import { Notifications } from '../entities/notifications.entity';
*/
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 100,
  })
  email: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 100,
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Establishing a one to one relationship with the profiles table
  @OneToOne(() => Profiles, (profile) => profile.user, {
    //nullable: true,
    cascade: ['insert', 'remove'],
    eager: true
  })
  @JoinColumn()
  profile?: Profiles;

  /*

  //Elistablished a one to many relationship with the enrollments table
  @OneToMany(() => Enrollments, (enrollment) => enrollment.user)
  enrollments: Enrollments[];

  //Elistablished a one to many relationship with the assessment_submissions table
  @OneToMany(
    () => Assessments_submissions,
    (assessment_submitted) => assessment_submitted.user,
  )
  assessment_submitted: Assessments_submissions[];

  //Establishing a one to many relationship with the notification table
  @OneToMany(() => Notifications, (notification) => notification.user)
  personalNotifications: Notifications[];
*/
}
