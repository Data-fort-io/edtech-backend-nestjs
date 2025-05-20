import { forwardRef, Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollments } from './entity/enrollments.entity';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  providers: [EnrollmentsService],
  imports: [ TypeOrmModule.forFeature([
    Enrollments
  ]), forwardRef(()=> CoursesModule)],
  exports: [ EnrollmentsService ]
})
export class EnrollmentsModule {}
