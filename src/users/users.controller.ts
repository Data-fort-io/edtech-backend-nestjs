import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ProfilesService } from 'src/profiles/profiles.service';
import { ProfileDto } from 'src/profiles/dto/profiles.dto';
import { ActiveUser } from 'src/auth/decorators/activeUser.decorator';
import { updateUserTrackDto } from './dto/updateUserTrack.dto';

@Controller('users')
export class UsersController {
    constructor(
        public readonly userService: UsersService,

        public readonly profileService: ProfilesService
    ){}

    @Get("me")
    async userProfile(@ActiveUser("sub") userId){
        return await this.profileService.userProfile(userId)
    }

    @Patch("me")
    async updateUserProfile(@Body() updateProfileInfo: ProfileDto, @ActiveUser('sub') userId){
       await this.profileService.updateUserProfile(updateProfileInfo, userId)
    }

    @Patch("track")
    async updateUserTrack(@Body() tracks: updateUserTrackDto, @ActiveUser('sub') userId){
        const response = await this.userService.updateUserTrack(userId, tracks)
        return {
            message: "User track updated successfully",
            tracks: response
        }
    }
}
