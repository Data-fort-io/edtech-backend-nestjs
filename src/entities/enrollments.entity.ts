import { status } from 'src/common/enums/status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Courses } from './courses.entity';
import { Users } from './user.entity';

@Entity()
export class Enrollments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  status: status;

  // Established a many to one relationship with the user who enrolled
  @ManyToOne(() => Users, (user) => user.enrollments)
  user: Users;

  // established a many to one relationship with the course enrolled for
  @ManyToOne(() => Courses, (course) => course.enrollments)
  course: Courses;

  @CreateDateColumn()
  enrolledAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
