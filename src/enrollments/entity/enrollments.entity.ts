
import { Status } from 'src/common/enums/status.enum';
import { Courses } from 'src/courses/entity/courses.entity copy';
import { Users } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity()
export class Enrollments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    default: Status.PENDING,
    nullable: false,
  })
  status: Status;

  // Established a many to one relationship with the user who enrolled
  @ManyToOne(() => Users, (user) => user.enrollments, {nullable: false})
  user: Users;

  // established a many to one relationship with the course enrolled for
  @ManyToOne(() => Courses, (course) => course.enrollments, {nullable: false})
  course: Courses;

  @CreateDateColumn()
  enrolledAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
}
