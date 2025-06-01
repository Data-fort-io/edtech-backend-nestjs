import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto{

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc0ODcyOTk3NSwiZXhwIjoxNzQ4ODE2Mzc1fQ.3WBwfnTn_SpzthkoXXgFp-5Bo3FaaQAz2ppB6Q7fjT0'
    })
    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}