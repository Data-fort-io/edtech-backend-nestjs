import { Gender } from 'src/common/enums/gender.enum';
import { Track } from 'src/common/enums/track.enum';
import {IsEnum, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
    @ApiProperty({
        example: 'Ochigbo daniel'
    })
    @IsString()
    fullname: string

    @ApiProperty({
        example: 'Ochigbo Daniel'
    })
    @IsString()
    bio: string

    @ApiProperty({
        example: 'https://image/photo.jpg'
    })
    @IsString()
    image: string

    @ApiProperty({
        example: 'male'
    })
    @IsEnum(Gender)
    gender: Gender

    @IsEnum(Track)
    track: Track[]

    @ApiProperty({
        example: '1990-10-10'
    })
    @IsString()
    dob: string

}