import { Body, Controller, Get, Param, ParseEnumPipe, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ProfilesService } from 'src/profiles/profiles.service';
import { ProfileDto } from 'src/profiles/dto/profiles.dto';
import { ActiveUser } from 'src/auth/decorators/activeUser.decorator';
import { updateUserTrackDto } from './dto/updateUserTrack.dto';
import { CoursesService } from 'src/courses/courses.service';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { Status } from 'src/common/enums/status.enum';
import { parse } from 'path';
import { EnrollmentStatusQueryDTO } from './dto/erollmentStatus.dto';

@Controller('users')
export class UsersController {
    constructor(
        public readonly userService: UsersService,

        public readonly profileService: ProfilesService,

        public readonly courseService: CoursesService,

        public readonly enrollmentService: EnrollmentsService
    ){}

    @Get("me")
    async userProfile(@ActiveUser("sub") userId){
        return await this.profileService.userProfile(userId)
    }

    @Patch("me")
    async updateUserProfile(@Body() updateProfileInfo: ProfileDto, @ActiveUser('sub') userId){
       await this.profileService.updateUserProfile(updateProfileInfo, userId)
    }

    @Patch("track")
    async updateUserTrack(@Body() tracks: updateUserTrackDto, @ActiveUser('sub') userId){
        const response = await this.userService.updateUserTrack(userId, tracks)
        return {
            message: "User track updated successfully",
            tracks: response
        }
    }

    @Get("courses")
    async getSuggestedCourse(@ActiveUser('sub') userId){
        return await this.courseService.userCourses(userId)
    }

    @Post("courses/:id/enroll")
    async userCourseEnrollment(@Param('id', ParseIntPipe) courseId: number, @ActiveUser('sub') userId: number){
        return await this.enrollmentService.userEnrollCourse(userId, courseId)
    }

    @Get('courses/enrolls')
    async userCoursesEnrollStatus(@ActiveUser("sub") userId: number, @Query() query: EnrollmentStatusQueryDTO){
        if(query.status){
            return (await this.enrollmentService.userEnrolledCourses(userId)).filter(enlloment => enlloment.status === query.status)
        }

        return this.enrollmentService.userEnrolledCourses(userId)
    }
}
