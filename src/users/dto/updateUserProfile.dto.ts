import { Gender } from 'src/common/enums/gender.enum';
import { Track } from 'src/common/enums/track.enum';
import {IsEnum, IsString } from 'class-validator'
import { Entity } from 'typeorm';

export class UserProfileDto {
    @IsString()
    fullname: string

    @IsString()
    bio: string

    @IsString()
    image: string

    @IsEnum(Gender)
    gender: Gender

    @IsEnum(Track)
    track: Track[]

    @IsString()
    dob: string

}