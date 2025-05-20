import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollments } from './entity/enrollments.entity';
import { CoursesService } from 'src/courses/courses.service';
import { Status } from 'src/common/enums/status.enum';


@Injectable()
export class EnrollmentsService {
    constructor(
        @InjectRepository(Enrollments)
        private readonly enrollmentRepo: Repository<Enrollments>,

        
        private readonly courseService: CoursesService
    ){}

    //User enroll for a course for a course
    public async userEnrollCourse(userId: number, courseId: number){

        const courseDetail = await this.courseService.courseDetails(courseId)

        try {
            // Check if user already registered for the course
            const isUserErolled = await this.enrollmentRepo.findOne({
                where: {
                    user: { id: userId},
                    course: { id: courseId}
                }
            })

            if(isUserErolled){
                return {
                    message: `Your enrollment request is ${isUserErolled.status}`
                }
            }


            const enrollment = this.enrollmentRepo.create({
                course: {id: courseId},
                user: {id: userId}
            })

            const enrollmentDetails = this.enrollmentRepo.save(enrollment);

            return {
                message: "Enrollment request sent successfully",
                data:{
                    id: (await enrollmentDetails).id,
                    status: (await enrollmentDetails).status,
                    course_title: courseDetail.title,
                    enrolledAt: (await enrollmentDetails).enrolledAt,
                    updatedAt: (await enrollmentDetails).updatedAt
                }
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

    //Get all the courses a user is enrollend on
    public async userEnrolledCourses(userId: number){
        
        try {
            const userApprovedEnroll = await this.enrollmentRepo.find({
                where: {
                    user: { id: userId},
                },
                relations: [ 'course' ]
            })
    
            if(!userApprovedEnroll){
                throw new NotFoundException("User does not have an enrolled course");
            }

            return userApprovedEnroll;

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
