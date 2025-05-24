import { BadRequestException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HashingProvider } from './provider/hashing.provider';
import { Users } from 'src/users/user.entity';
import { ActiveUserType } from './interfaces/active.interface';
import { RefreshTokenDto } from './dto/refreh_token.dto';

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

    // function to perform login authentication
    public async login(loginDto: LoginUserDto){
        const user = await this.userService.loginUser(loginDto)

        // Compare password
        const isMatch = await this.hashProvider.comparePassword(loginDto.password, user.password)
        if(isMatch === false){
            throw new BadRequestException("Wrong password")
        }

        //return the the access and refresh token 
        return this.generateToken(user)     
    }

    public async signup(signupDtO: CreateUserDto){
        const newUser = await this.userService.createUser(signupDtO)

        return {
            data: newUser,
            message: "User successfully created"
        }
    }

    private async signToken<T>(userId: number, expireIn: number, payload?: T){
        return await this.jwtService.signAsync({
            sub: userId,
            ...payload
        }, {
            secret: this.authConfiguration.secret,
            expiresIn: expireIn
        })
    }

    private async generateToken(user: Users){
        //Generate an acess token
        const accessToken = await this.signToken<Partial<ActiveUserType>>(user.id, this.authConfiguration.expireIn, {email: user.email})

        //Generate a refresh token
        const refreshToken = await this.signToken(user.id, this.authConfiguration.refreshTokenExpireIn);

        return {
            token: accessToken,
            refreshToken
        }
    }

    public async refreshToken(refreshToken: RefreshTokenDto){

        try {

            // Verify the refresh token
            const {sub} = await this.jwtService.verifyAsync(refreshToken.refreshToken, {
                secret: this.authConfiguration.secret
            })

                    

            // find the user
            const user = await this.userService.findUserById(sub);

            // Generate an Access token
            return await this.generateToken(user);
                
        } catch (error) {
            throw new UnauthorizedException(error);
        }

    }

}
