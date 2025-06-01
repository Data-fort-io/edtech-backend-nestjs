import { Module } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assessments } from './entity/assessment.entity';

@Module({
  providers: [AssessmentsService],
  imports: [
    TypeOrmModule.forFeature([Assessments])
  ],
  exports: [
    AssessmentsService
  ]
})
export class AssessmentsModule {}
