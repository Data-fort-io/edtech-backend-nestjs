import { Transform } from "class-transformer"
import { IsArray, IsDateString, IsEnum, IsOptional, IsString, IsUrl, Length } from "class-validator"
import { Gender } from "src/common/enums/gender.enum"
import { Track } from "src/common/enums/track.enum"

export class ProfileDto{
    
    @Length(5, 30)
    @IsString()
    @IsOptional()
    fullname?: string

    @Length(50, 500)
    @IsString()
    @IsOptional()
    bio?: string

    @Transform(({value})=> value.toUpperCase())
    @IsEnum(Gender)
    @IsString()
    @IsOptional()
    gender?: Gender

    @IsUrl()
    @IsOptional()
    image?: string

    @IsDateString({}, {message: "Date of Birth must be a valid ISO date string (e.g YYYY-MM-DD)"})
    @IsOptional()
    dob?: string
}