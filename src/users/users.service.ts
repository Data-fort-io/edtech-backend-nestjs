import { BadRequestException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { BcryptProvider } from 'src/auth/provider/bcrypt.provider';
import { HashingProvider } from 'src/auth/provider/hashing.provider';
import { LoginUserDto } from './dto/loginUser.dto';
import { exist } from 'joi';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private userRepo: Repository<Users>,
        
        private hashProvider: HashingProvider,
    ){}

    public async loginUser(loginDto: LoginUserDto){
        try {
            // GEt the user by username
            const user = await this.userRepo.findOne({ 
                where:{username: loginDto.username },
                relations: ['profile']
            });

            //check if the user with the abovve username is registered
            if(!user){
                throw new BadRequestException("Username dose not exist")
            }
            // convert user info to accessible object        
            const plainUser = JSON.parse(JSON.stringify(user))
            // return this to the authService for futher authentication process
            return plainUser
            
            
        } catch (error) {
            if(error.code === "ECONNECTIONREFUSED"){
                throw new RequestTimeoutException("An error has occured. Please try again", {
                    description: "Could not connect to the data base"
                })
            }

            throw error
        }
    }

    // Create user function
    public async createUser(userInfo: CreateUserDto){

        try {

            //check if the user with the  given username already exist
            const existingUsername = await this.userRepo.findOne({
                where: [{ username: userInfo.username}]
            })

            if(existingUsername){
                throw new BadRequestException("There is already a registered username with this username")
            }

            //check if a user with the given email already exist
            const existingEmail = await this.userRepo.findOne({
                where: [{ username: userInfo.username, email: userInfo.email}]
            })

            if(existingEmail){
                throw new BadRequestException("There is already a registered username with this email")
            }

             // Create user object with user info and hashed password
                let user = this.userRepo.create({
                    ...userInfo,
                    password: await this.hashProvider.hashPassword(userInfo.password),
                    profile: userInfo.profile ?? {}
                });
        
                // Save user in the database
                await this.userRepo.save(user)
            
        } catch (error) {
            if(error.code === "ECONNECTIONREFUSED"){
                throw new RequestTimeoutException("An error has occured. Please try again", {
                    description: "Could not connect to the data base"
                })
            } 
            
            throw error;
        }
    }
}
