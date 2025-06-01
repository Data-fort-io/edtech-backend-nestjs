import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsDateString, IsEnum, IsOptional, IsString, IsUrl, Length } from "class-validator"
import { Gender } from "src/common/enums/gender.enum"


export class ProfileDto{
    @ApiProperty({
        example: 'Ochigbo Daniel'
    })    
    @Length(5, 30)
    @IsString()
    @IsOptional()
    fullname?: string

    @ApiProperty({
        example: 'A dedicated and self driven backend Application, love exploring the tech scape. and open to learning'
    })
    @Length(50, 500)
    @IsString()
    @IsOptional()
    bio?: string

    @ApiProperty({
        example: 'male'
    })
    @Transform(({value})=> value.toUpperCase())
    @IsEnum(Gender)
    @IsString()
    @IsOptional()
    gender?: Gender

    @ApiProperty({
        example: 'https://image/photo.jpg'
    })
    @IsUrl()
    @IsOptional()
    image?: string

    @ApiProperty({
        example: '1990-10-10'
    })
    @IsDateString({}, {message: "Date of Birth must be a valid ISO date string (e.g YYYY-MM-DD)"})
    @IsOptional()
    dob?: string
}