import { ApiProperty } from "@nestjs/swagger"
import { Status } from "src/common/enums/status.enum"

export class SuccessResponse{
    @ApiProperty({
        example: 1
    })
    id: number
    
    @ApiProperty({
        example:"Introduction to backend"
    })
    title: string

    @ApiProperty({
        example: 60
    })
    duration: number

    @ApiProperty({
        example: [ "understand backend"]
    })    
    objectives: string[]

    @ApiProperty({
        example: [ "fronted" ]
    })    
    track: string[]

    @ApiProperty({
        example: "2025-05-24T15:44:05.343Z"
    })
    createdAt: string

    @ApiProperty({
        example: "2025-05-24T15:44:05.343Z"
    })
    updatedAt: string

}

export class CourseEnrollmentRes{
    @ApiProperty({
        example: 1
    })
    id: number
    
    @ApiProperty({
        example: Status.APPROVED
    })
    status: string

    course: SuccessResponse

    @ApiProperty({
        example: "2025-05-18T12:25:46.748Z"
    })
    enrolledAt: string

    @ApiProperty({
        example: "2025-05-18T12:25:46.748Z"
    })
    updatedAt: string
}

class Question{

    @ApiProperty({
        example: "What is backend all about"
    })
    text: string

    @ApiProperty({
        isArray: true,
        example: "a food"
    })
    option: string[]

    @ApiProperty({
        example: "a"
    })
    correctAnswer: string
}

export class CourseAssessmentRes{
    @ApiProperty({
        example: 3
    })
    id: number

    @ApiProperty({
        example: "First Assessment" 
    })
    title: string

    @ApiProperty({
        example: "Make sure to answer all the questions"
    })
    instruction: string

    @ApiProperty({
        type: Question
    })
    question: Question[]

    @ApiProperty({
        example: "2025-05-24T15:36:01.301Z"
    })
    createdAt: string

    @ApiProperty({
        example: "2025-05-24T15:36:01.301Z"
    })
    SubmitedAt:  string
}


export class SubmitAssessmentRes{
    @ApiProperty({ example: "3"})
    id: number

    @ApiProperty({ isArray: true, example: ["a", "b", 'b', 'c']})
    answers: string[]

    @ApiProperty({ example: "5"})
    score: number

    @ApiProperty({ example: "2025-05-25T00:15:10.372Z"})
    createdAt: string
}

class resourse {
    @ApiProperty({ example: "Master Url"})
    title: string

    @ApiProperty({ example: "www.masterbackend.com"})
    url: string

    @ApiProperty({ example: {...SuccessResponse}})
    course: any
}

export class CourseResourseRes{
    @ApiProperty({ example: [ resourse ]})
    resourses: any
}



class record {
    @ApiProperty({ example: "Master Url"})
    title: string

    @ApiProperty({ example: "www.masterbackend.com"})
    url: string

    @ApiProperty({ example: 50})
    duration: number

    @ApiProperty({ example: {...SuccessResponse}})
    course: any
}
export class CourseRecordRes{
    @ApiProperty({ example: [ record ]})
    record: any
}