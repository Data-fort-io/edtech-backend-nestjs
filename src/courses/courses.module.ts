import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Courses } from './entity/courses.entity copy';
import { Users } from 'src/users/user.entity';

@Module({
  providers: [CoursesService],
  imports: [
    TypeOrmModule.forFeature([Courses, Users])
  ],
  exports: [ CoursesService ]
})
export class CoursesModule {}
