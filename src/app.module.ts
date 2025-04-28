import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './entities/user.entity';
import { Assessments } from './entities/assessments.entity';
import { Assessments_submissions } from './entities/assessment_submissions.entity';
import { Notifications } from './entities/notifications.entity';
import { Leadership_boards } from './entities/leadership_boards.entity';
import { Courses } from './entities/courses.entity';
import { Recordings } from './entities/recordings.entity';
import { Resourses } from './entities/resourses.entity';
import { Enrollments } from './entities/enrollments.entity';
import { Profiles } from './entities/profile.entity';
import { UsersModule } from './users/users.module';


@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: ()=>({
      type: "postgres",
      autoLoadEntities: false,
      synchronize: true,
      host: "localhost",
      port: 5342,
      username: "postgres",
      password: "postgres",
      database: "edtech_db",

      entities: [
        Users,
        Resourses,
        Profiles,
        Recordings,
        Notifications,
        Leadership_boards,
        Enrollments,
        Courses,
        Assessments,
        Assessments_submissions
      ],
    })
  
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
