import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { BcryptProvider } from 'src/auth/provider/bcrypt.provider';
import { HashingProvider } from 'src/auth/provider/hashing.provider';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private userRepo: Repository<Users>,
        
        private hashProvider: HashingProvider,
    ){}

    public async loginUser(loginDto: LoginUserDto){
        // GEt the user by username
        const user = await this.userRepo.findOne({ 
            where:{username: loginDto.username },
            relations: ['profile']
    });

    if(!user){
        return "User does not exist"
    }

    const plainUser = JSON.parse(JSON.stringify(user))
    
    return plainUser
    }

    public async createUser(userInfo: CreateUserDto){
    
        // Creat user object
        let user = this.userRepo.create({
            ...userInfo,
            password: await this.hashProvider.hashPassword(userInfo.password),
            profile: userInfo.profile ?? {}
        });

        // Save user in the database
        await this.userRepo.save(user)
    }
}
