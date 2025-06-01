import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Profiles } from 'src/profiles/profile.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { Tracks } from 'src/entities/track .entity';
import { CoursesModule } from 'src/courses/courses.module';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { AssessmentsModule } from 'src/assessments/assessments.module';
import { AssessmentSubmissionModule } from 'src/assessment_submission/assessment_submission.module';
import { Records } from 'src/records/entity/recordings.entity';
import { RecordsModule } from 'src/records/records.module';
import { ResoursesModule } from 'src/resourses/resourses.module';

@Module({
  providers: [UsersService,],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([Users, Profiles, Tracks]),
    forwardRef(()=> AuthModule),
    forwardRef(()=> ProfilesModule),
    forwardRef(()=> CoursesModule),
    forwardRef(()=> EnrollmentsModule),
    forwardRef(()=> NotificationsModule),
    forwardRef(()=> AssessmentsModule),
    forwardRef(()=> AssessmentSubmissionModule),
    forwardRef(()=> RecordsModule),
    forwardRef(()=> ResoursesModule)
  ],
  exports: [UsersService]
})
export class UsersModule {}
