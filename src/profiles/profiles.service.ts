import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfileDto } from 'src/users/dto/updateUserProfile.dto';
import { Users } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Profiles } from './profile.entity';
import { ProfileDto } from './dto/profiles.dto';
import { ActiveUser } from 'src/auth/decorators/activeUser.decorator';
import { ActiveUserType } from 'src/auth/interfaces/active.interface';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Users)
        private userRepo: Repository<Users>,

        @InjectRepository(Profiles)
        private profileRepo: Repository<Profiles>
    ){}

    //Get loged in user profile
    public async userProfile(userId: number){

        try {
            //Find user by id
            const userInfo =  await this.userRepo.findOne({
                where: {
                    id: userId
                }
            })

            if(!userInfo){
                throw new NotFoundException("User does not exist")
            }

            return userInfo?.profile
            
        } catch (error) {
            if(error.code === "ECONNECTIONREFUSED"){
                throw new RequestTimeoutException("An error has occured. Please try again", {
                    description: "Could not connect to the data base"
                })
            }

            throw error
        }
        
    }

    //Update user profile
    public async updateUserProfile(updateProfileInfo: ProfileDto, userId: number){
        
        try {
            //Find authenticated user by id from the payload
            const userInfo =  await this.userRepo.findOne({
                where: {
                    id: userId
                },
                relations: ['profile']
            })

            // GEt the profile of the user
            const profile = userInfo?.profile;
            if(!profile){
                throw new NotFoundException("Profile not found");
            }

            //Update the profile of the user
            await this.profileRepo.update(profile.id, updateProfileInfo)
            
            return "Profile Updated successfully"
            
        } catch (error) {
            if(error.code === "ECONNECTIONREFUSED"){
                throw new RequestTimeoutException("An error has occured. Please try again", {
                    description: "Could not connect to the data base"
                })
            }

            throw error
        }
        
    }
}
