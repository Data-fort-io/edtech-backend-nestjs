import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, minLength } from "class-validator"
import { optional } from "joi"
import { ProfileDto } from "src/profiles/dto/profiles.dto"

export class CreateUserDto{
    
    @MaxLength(20)
    @MinLength(4)
    @IsString()
    @IsNotEmpty()
    username: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: "A strong password is requiered",
    })
    @IsString()
    @IsNotEmpty()
    password: string

    @IsOptional()
    profile: ProfileDto | null;
}