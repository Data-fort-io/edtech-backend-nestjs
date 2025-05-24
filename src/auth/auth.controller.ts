import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { AuthGuard } from './guard/auth.guard';
import { AllowAnonymous } from './decorators/allow_anonymous.decorator'
import { RefreshTokenDto } from './dto/refreh_token.dto';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authServices: AuthService
    ){}

    @AllowAnonymous()
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginUserDto){
        return await this.authServices.login(loginDto)
    }

    @AllowAnonymous()
    @Post("signup")
    async signup(@Body() signupDto: CreateUserDto){
        return await this.authServices.signup(signupDto);
    }

    @AllowAnonymous()
    @Post("refresh-token")
    @HttpCode(HttpStatus.OK)
    public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto){
        return await this.authServices.refreshToken(refreshTokenDto);     
    }

}
