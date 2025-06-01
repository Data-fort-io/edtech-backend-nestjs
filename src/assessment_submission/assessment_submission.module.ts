import { forwardRef, Module } from '@nestjs/common';
import { AssessmentSubmissionService } from './assessment_submission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assessments_submissions } from './entity/assessment_submission.entity';
import { AssessmentsModule } from 'src/assessments/assessments.module';

@Module({
  providers: [AssessmentSubmissionService],

  imports: [
    TypeOrmModule.forFeature([
      Assessments_submissions
    ]),
    forwardRef(()=> AssessmentsModule)
  ],

  exports: [ AssessmentSubmissionService ]
})
export class AssessmentSubmissionModule {}
