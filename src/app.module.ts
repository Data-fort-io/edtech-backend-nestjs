import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './users/user.entity';
/*
import { Assessments } from './entities/assessments.entity';
import { Assessments_submissions } from './entities/assessment_submissions.entity';
import { Notifications } from './entities/notifications.entity';
import { Leadership_boards } from './entities/leadership_boards.entity';

import { Recordings } from './entities/recordings.entity';
import { Resourses } from './entities/resourses.entity';
import { Enrollments } from './entities/enrollments.entity';

import { Profiles } from './profiles/profile.entity';
*/
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig  from './config/app.config';
import database from './config/database.config';
import envValidator from './config/env.validation'
import authConfig from './auth/config/auth.config';
import { JwtModule } from '@nestjs/jwt';
import { Tracks } from './entities/track .entity';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { Courses } from './courses/entity/courses.entity copy';
import { Enrollments } from './enrollments/entity/enrollments.entity';

const ENV = process.env.NODE_ENV

@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load:[appConfig, database],
      validationSchema: envValidator
      
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService)=> ({
      type: "postgres",
      autoLoadEntities: true,
      synchronize: true,
      //dropSchema:true,
      entities: [Users, Tracks, Courses, Enrollments],
      host: configService.get('database.host'),
      port: configService.get<number>('database.port'),
      username: configService.get('database.username'),
      password: configService.get('database.password'),
      database: configService.get('database.name'),
      
})
  
  }), 
  UsersModule, ProfilesModule, AuthModule,
  ConfigModule.forFeature(authConfig),
  JwtModule.registerAsync(authConfig.asProvider()),
  CoursesModule,
  EnrollmentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}


