import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { ProfileDto } from 'src/profiles/dto/profiles.dto';
import { ActiveUser } from 'src/auth/decorators/activeUser.decorator';
import { updateUserTrackDto } from './dto/updateUserTrack.dto';
import { CoursesService } from 'src/courses/courses.service';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { EnrollmentStatusQueryDTO } from './dto/erollmentStatus.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { AssessmentsService } from 'src/assessments/assessments.service';
import { AssessmentSubmissionService } from 'src/assessment_submission/assessment_submission.service';
import { AnswerDto } from 'src/assessment_submission/dto/answer.dto';
import { RecordsService } from 'src/records/records.service';
import { ResoursesService } from 'src/resourses/resourses.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CourseAssessmentRes, CourseEnrollmentRes, CourseRecordRes, CourseResourseRes, SubmitAssessmentRes, SuccessResponse } from './swagger/courseResponse.swagger';
import { Status } from 'src/common/enums/status.enum';


@Controller('users')
export class UsersController {
    constructor(
        public readonly userService: UsersService,

        public readonly profileService: ProfilesService,

        public readonly courseService: CoursesService,

        public readonly enrollmentService: EnrollmentsService,

        public readonly notificationService: NotificationsService,

        public readonly assessmentService: AssessmentsService,

        private readonly assessmentSubmissionService: AssessmentSubmissionService,

        private readonly recordsService: RecordsService,

        private readonly resourceService: ResoursesService
    ){}
   
    @ApiBearerAuth()
    @Get("profile") 
    @Patch("profile")
    async updateUserProfile(@Body() updateProfileInfo: ProfileDto, @ActiveUser('sub') userId){
       return await this.profileService.updateUserProfile(updateProfileInfo, userId)
    }

    @ApiBearerAuth()
    @ApiResponse({
        status: 201, description: "Track Updated"
    })
    @Patch("track")
    async updateUserTrack(@Body() tracks: updateUserTrackDto, @ActiveUser('sub') userId){
        const response = await this.userService.updateUserTrack(userId, tracks)
        return {
            message: "User track updated successfully",
            tracks: response
        }
    }

    //Endpoint to get all user recommended course base on the track of the user
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        type: SuccessResponse,
        description: "Get all the courses that are recommended for user based onhis track"
    })
    @Get("courses")
    async getSuggestedCourse(@ActiveUser('sub') userId){
        return await this.courseService.userCourses(userId)
    }

    //Endpoint to enroll for a particular course
    @ApiBearerAuth()
    @ApiParam({  name: 'id', required: true, description: "The id of the course user intends to register for"  })
    @ApiResponse({
        status: 200,
        type: SuccessResponse
    })
    @ApiResponse({
        status: 404,
        description: "course not found"
    })  
    @Post("courses/:id/enroll")
    async userCourseEnrollment(@Param('id', ParseIntPipe) courseId: number, @ActiveUser('sub') userId: number){
        return await this.enrollmentService.userEnrollCourse(userId, courseId)
    }

    //Get all the course a useer has enrolled for
    @ApiBearerAuth()
    @ApiQuery({
        name: 'status', required: false, enum: ['pending', 'approved', 'declined'], 
        example: "pending", description: "Querry with status of the course enrollment",    
    })
    @ApiResponse({
        status: 201, isArray: true, type: CourseEnrollmentRes,
        description: "List of all course user enrolled for + query by status"
    })
    @Get('courses/enrolls')
    async userCoursesEnrollStatus(@ActiveUser("sub") userId: number, @Query() query: EnrollmentStatusQueryDTO){
        if(query.status){
            return (await this.enrollmentService.userEnrolledCourses(userId)).filter(enlloment => enlloment.status === query.status)
        }

        return this.enrollmentService.userEnrolledCourses(userId)
    }

    @ApiBearerAuth()
    @ApiParam({
        name: "id", required: true, description: "Id of the assessment user indends to take", example: 3 
    })
    @ApiResponse({
        status: 200,
        type: CourseAssessmentRes
    })
    @ApiResponse({
        status: 404,
        description: "Assessment not found"
    })
    //Get course assessment
    @Get('courses/assessments/:id')
    async courseAsessment(@Param('id', ParseIntPipe) assessmentId: number){
        return await this.assessmentService.getCourseAssessment(assessmentId)        
    }

    @ApiBearerAuth()
    @ApiParam({
        name: "id", required: true, description: "Id of the courses user indends to get record of", 
        example: 3 
    })
    @ApiResponse({
        status: 200,
        isArray: true,
        type: CourseRecordRes
    })
    @ApiResponse({
        status: 404,
        description: "Course not found not found"
    })
    //Get all course records
    @Get('courses/:id/record')
    async courseRecords(@Param('id', ParseIntPipe) courseId: number){
        return await this.recordsService.courseRecords(courseId);
    }

    @ApiBearerAuth()
    @ApiParam({
        name: "id", required: true, description: "Id of the courses user indends to get resourses of", 
        example: 3 
    })
    @ApiResponse({
        isArray: true,
        status: 200,
        type: CourseResourseRes
    })
    @ApiResponse({
        status: 404,
        description: "Course not found not found"
    })
    //Get all course resources
    @Get('courses/:id/resources')
    async coursResources(@Param('id', ParseIntPipe) courseId: number){
        return await this.resourceService.courseResources(courseId)
    }

    @ApiBearerAuth()
    @ApiParam({
        name: "id", required: true, description: "Id of assessment user indends to submit", 
        example: 3 
    })
    @ApiResponse({
        status: 201,
        type: SubmitAssessmentRes
    })
    @ApiResponse({
        status: 404,
        description: "Assessment not found"
    })
    //Submit assessment
    @Post('courses/assessments/:id/submit')
    async submitAssessment(@Body() userAnswers: AnswerDto, @ActiveUser('sub') userId: number, @Param('id', ParseIntPipe) assessmentId: number){
        return await this.assessmentSubmissionService.submitAssessment(assessmentId, userId, userAnswers.answers)
    }

    @ApiBearerAuth()
    @ApiResponse({
        status: 200, description: "A list of notification for a user"
    })
    //Get all user notification
    @Get('notifications')
    async userNotifications(@ActiveUser("sub") userId: number){
       return await this.notificationService.getAllNotifications(userId)    
    }

    @ApiBearerAuth()
    @ApiResponse({
        status: 200, description: "Update the read status on a notification"
    })
    //Update the notification read status
    @Patch("notifications/:id/read")
    async readNotifitiion(@ActiveUser("sub") userId: number, @Param('id', ParseIntPipe) notificationId: number){
        return await this.notificationService.readNotification(notificationId, userId)
    }




}
