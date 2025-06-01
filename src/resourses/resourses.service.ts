import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Resources } from './entity/resourses.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ResoursesService {
    constructor(
        @InjectRepository(Resources)
        private readonly resourcesRepo: Repository<Resources>
    ){}

    public async courseResources(courseId: number){
        try {
            const resources = await this.resourcesRepo.find({
                where: { courses: {id: courseId}},
                relations: ["courses"]
            })
            
            if(!resources){
                throw new NotFoundException('Course was not found')
            }

            return {
                    records: resources.map(resource => ({
                    id: resource.id,
                    title: resource.title,
                    url: resource.url,
                    course: { 
                        id: resource.courses.id,
                        title: resource.courses.title
                    },
                    submitedAt: resource.submitedAt
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
