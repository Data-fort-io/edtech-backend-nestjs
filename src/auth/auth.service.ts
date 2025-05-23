import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HashingProvider } from './provider/hashing.provider';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(()=> UsersService))
        private readonly userService: UsersService,
        
        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,
        
        private hashProvider: HashingProvider,

        private readonly jwtService: JwtService
    ){}

    public async login(loginDto: LoginUserDto){
        const user = await this.userService.loginUser(loginDto)

        // Compare password
        const isMatch = await this.hashProvider.comparePassword(loginDto.password, user.password)
        if(isMatch === false){
            return "Wrong password"
        }

        //Generate a JWT Tokon 
        const token = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email
        }, {
            secret: this.authConfiguration.secret,
            expiresIn: this.authConfiguration.expireIn 
        })

        return {
            token
        }
        
    }

    public async signup(signupDtO: CreateUserDto){
        return await this.userService.createUser(signupDtO)
    }
}
