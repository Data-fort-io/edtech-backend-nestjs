import { Transform } from "class-transformer"
import { IsDateString, IsEnum, IsOptional, IsString, IsUrl, Length } from "class-validator"
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

    @Transform(({value})=> value.toUppercase())
    @IsEnum(Gender)
    @IsString()
    @IsOptional()
    gender?: Gender

    @IsUrl()
    @IsOptional()
    image?: string

    @Transform(({value})=> value.toUppercase())
    @IsEnum(Track)
    @IsString()
    @IsOptional()
    track?: Track[]

    @IsDateString({}, {message: "Date of Birth must be a valid ISO date string (e.g YYYY-MM-DD)"})
    @IsOptional()
    dob?: string
}