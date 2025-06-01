import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";

export class AnswerDto {
    @ApiProperty({
        example: "['a', 'b', 'c']"
    })
    @IsArray()
    @IsNotEmpty()
    answers: string[]
}