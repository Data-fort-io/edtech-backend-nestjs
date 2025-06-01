import { forwardRef, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Records } from './entity/recordings.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecordsService {
    constructor(
        @InjectRepository(Records)
        public recordRepository: Repository<Records>
    ){}

    public async courseRecords(courseId: number){
       try {
            const courseRecords = await this.recordRepository.find({
                where: { course: { id: courseId}},
                relations: [ 'course' ]
            })
            
            if(!courseRecords){
                throw new NotFoundException('Course was not found')
            }

            return {
                records: courseRecords.map(record => ({
                    id: record.id,
                    url: record.url,
                    duration: record.duration,
                    course: { 
                        id: record.course.id,
                        title: record.course.title
                    },
                    submitedAt: record.submitedAt
                }))
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
