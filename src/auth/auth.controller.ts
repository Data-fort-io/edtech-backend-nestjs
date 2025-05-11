import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authServices: AuthService
    ){}

    @Post("login")
    async login(@Body() loginDto: LoginUserDto){
        return await this.authServices.login(loginDto)
    }

    @Post("signup")
    async signup(@Body() signupDto: CreateUserDto){
        return await this.authServices.signup(signupDto);
    }
}
