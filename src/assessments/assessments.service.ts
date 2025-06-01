import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Assessments } from './entity/assessment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AssessmentsService {
    constructor(
        @InjectRepository(Assessments)
        private assessmentRepo: Repository<Assessments>
    ){}

    public async getCourseAssessment(assessmentId: number){
        try {

            const assessment = await this.assessmentRepo.findOne({
                where: { id: assessmentId},
                relations: ["questions"]
            })
            if(!assessment){
                throw new NotFoundException('Assess ment was not found')
            }
    
            return {
                id: assessment.id,
                title: assessment.title,
                instruction: assessment.instruction,
                total_score: assessment.total_score,
                questions: assessment.questions.map(q => ({
                    id: q.id,
                    text: q.text,
                    options: q.options,
                    correctAnswer: q.correct_answer
                })),
                createdAt: assessment.createdAt,
                submitedAt: assessment.submitedAt
            }   
            
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
