import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, minLength } from "class-validator"
import { optional } from "joi"
import { Tracks } from "src/entities/track .entity"
import { ProfileDto } from "src/profiles/dto/profiles.dto"

export class CreateUserDto{

    @ApiProperty({
        example: 'DannyDap',
        required: true
    })    
    @MaxLength(20)
    @MinLength(4)
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty({
        example: 'daniel.official@gmail.com',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        example: 'Ocpafom122@',
        required: true
    })
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: "A strong password is requiered",
    })
    @IsString()
    @IsNotEmpty()
    password: string

    @IsOptional()
    profile: ProfileDto | null;


    @IsOptional()
    @IsArray()
    tracks: Tracks[]
}