import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Courses } from './entity/courses.entity copy';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/user.entity';


@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Courses)
        private coursesRepo: Repository<Courses>,

        @InjectRepository(Users)
        private userRepo: Repository<Users>
    ){}

    public async userCourses(id: number){

        try {

            //Get all the desired tracks of the user
            const user = await this.userRepo.findOne({
                where: { id },
                relations: [ 'track' ]
            })

            // Get the list of the tracks id
            const userTracksId = user?.track.map(track => track.id)

                    //Get  the courses related to user track
            const userSuggestedCourse = await this.coursesRepo.createQueryBuilder('course')
                                                    .leftJoinAndSelect('course.tracks', 'track').where('track.id IN (:...ids)', { ids: userTracksId })
                                                    .getMany();

            if(userSuggestedCourse.length < 1){
                throw new NotFoundException("There are no registered course for your track(s)")
            }

            return userSuggestedCourse.map(course => ({
                    id: course.id,
                    title: course.title,
                    duration: course.duration,
                    objectives: course.objectives,
                    track: course.tracks.map(track => ({
                        name: track.name
                })),
                createdAt: course.createdAt,
                submitedAt: course.submitedAt
            }))

            
        } catch (error) {
            if(error.code === "ECONNECTIONREFUSED"){
                throw new RequestTimeoutException("An error has occured. Please try again", {
                    description: "Could not connect to the data base"
                })
            }
            
            throw error
        }               
    }

    public async courseDetails(id: number){
        try {
            const course = await this.coursesRepo.findOneBy({ id });
            
            if(!course){
                throw new NotFoundException("Course not found");
            }
            return course
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


