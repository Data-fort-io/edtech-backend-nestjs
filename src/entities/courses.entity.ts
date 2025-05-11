/*
import { Track } from 'src/common/enums/track.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Assessments } from './assessments.entity';
import { Enrollments } from './enrollments.entity';
import { Notifications } from './notifications.entity';
import { Recordings } from './recordings.entity';
import { Resourses } from './resourses.entity';


@Entity()
export class Courses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 200,
  })
  title: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  duration: number;

  @Column({
    type: 'simple-array',
    nullable: false,
  })
  objectives: string[];

  @Column({
    type: 'varchar',
    nullable: false,
  })
  track: Track;

  // Established a one to one relationship with the recording table
  @OneToMany(() => Recordings, (record) => record.course)
  record: Recordings[];

  //Etablishing a mant to many relationship with the assessment table
  @ManyToMany(() => Assessments, (assessment) => assessment.courses)
  @JoinTable()
  assessments: Assessments[];

  //Established a many to many relationship with the resourses table
  @ManyToMany(() => Resourses, (resourse) => resourse.courses, {
    nullable: true,
  })
  @JoinTable()
  resources?: Resourses[];

  // Establish a one to many relationsh with the enrollments table
  @OneToMany(() => Enrollments, (enrollments) => enrollments.course)
  enrollments: Enrollments[];

  //Establishing a one to many relationship with the notification table
  @OneToMany(() => Notifications, (notification) => notification.course)
  courseNotifications: Notifications[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  submitedAt: Date;
  
}
  */
