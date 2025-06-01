import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assessments_submissions } from './entity/assessment_submission.entity';
import { Repository } from 'typeorm';
import { AnswerDto } from './dto/answer.dto';
import { Assessments } from 'src/assessments/entity/assessment.entity';
import { AssessmentsService } from 'src/assessments/assessments.service';
import { markAnswer } from './utils/markAnswers.utils';

@Injectable()
export class AssessmentSubmissionService {
    constructor(

        @InjectRepository(Assessments_submissions)
        private assessmentSubmissionRepo: Repository<Assessments_submissions>,

        @Inject(forwardRef(()=> AssessmentsService))
        private assessmentService: AssessmentsService

    ){}

    //Submit Assessment
    public async submitAssessment(assessmentId: number, userId: number, submitAnswerDto: string[]){
        
        try {
            //Get a particular assessment
            const assessment = await this.assessmentService.getCourseAssessment(assessmentId)

            //Insert all answers to the assessment in an array
            const anwers = assessment.questions.map(q => (q.correctAnswer));

            //Get the score of the assessment using the mark function
            const result = markAnswer(anwers, submitAnswerDto);
            let score = 0;
            for(let i = 0; i < result.length; i++){
                if(result[i] === true){
                    score++
                }
            }

            //Check if the user has already submitted the assessment before
            //if yes, the just update the score and answers with the new data
            const isSubmit = await this.assessmentSubmissionRepo.findOne({
                where: {
                    user: {id: userId},
                    assessment: {id: assessmentId}
                }
            })
            if(isSubmit){
                isSubmit.answers = submitAnswerDto;
                isSubmit.score = score;
                return await this.assessmentSubmissionRepo.save(isSubmit)
            }

            //Inser the assessment into the assessments_submission table         
            const assessment_submission = this.assessmentSubmissionRepo.create({
                answers: submitAnswerDto, 
                user: {id: userId},
                score,
                assessment: {id: assessmentId}      
            })

            return await this.assessmentSubmissionRepo.save(assessment_submission)
            
        } catch (error) {
            if(error.code === "ECONNECTIONREFUSED"){
                throw new RequestTimeoutException("An error has occured. Please try again", {
                    description: "Could not connect to the data base"
                })
            }
            throw error            
        }
         
    }
}
