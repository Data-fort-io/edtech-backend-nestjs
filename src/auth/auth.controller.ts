import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { AuthGuard } from './guard/auth.guard';
import { AllowAnonymous } from './decorators/allow_anonymous.decorator'


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authServices: AuthService
    ){}

    @AllowAnonymous()
    @Post("login")
    async login(@Body() loginDto: LoginUserDto){
        return await this.authServices.login(loginDto)
    }

    @AllowAnonymous()
    @Post("signup")
    async signup(@Body() signupDto: CreateUserDto){
        return await this.authServices.signup(signupDto);
    }

}
