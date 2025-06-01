import { Assessments } from 'src/assessments/entity/assessment.entity';
import { Enrollments } from 'src/enrollments/entity/enrollments.entity';
import { Tracks } from 'src/entities/track .entity';
import { Records } from 'src/records/entity/recordings.entity';
import { Resources} from 'src/resourses/entity/resourses.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
/*
import { Assessments } from './assessments.entity';
import { Notifications } from './notifications.entity';
import { Recordings } from './recordings.entity';
import { Resourses } from './resourses.entity';
*/

@Entity()
export class Courses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
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

  @ManyToMany(()=> Tracks, (tracks)=> tracks.courses, {
    cascade: true
  })
  @JoinTable()
  tracks: Tracks[];

  // Establish a one to many relationsh with the enrollments table
  @OneToMany(() => Enrollments, (enrollments) => enrollments.course)
  enrollments: Enrollments[];

  //Etablishing a one to one relationship with the assessment table
  @OneToOne(() => Assessments, (assessment) => assessment.course)
  @JoinColumn()
  assessment: Assessments;


  // Established a one to one relationship with the recording table
  @OneToMany(() => Records, (record) => record.course)
  record: Records[];

  //Established a one to many relationship with the resourses table
  @OneToMany(() => Resources, (resource) => resource.courses, {
    nullable: true,
  })
  resources?: Resources[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  submitedAt: Date;
  
}
  
