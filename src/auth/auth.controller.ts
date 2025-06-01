import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { AllowAnonymous } from './decorators/allow_anonymous.decorator'
import { RefreshTokenDto } from './dto/refreh_token.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginResponse, WrongPasswordResponse, WrongUserNameResponse } from './swagger/loginRespons.swaggeer';
import { CreateDateColumn } from 'typeorm';
import { CreateUserResponse } from './swagger/createResponse.swagger';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authServices: AuthService
    ){}

    @ApiOperation({
        summary: "Check if user is a register user, then returns an access token and a refresh token"
    })
    @ApiResponse({
        status: 200,
        type: LoginResponse
    })
    @ApiResponse({
        status: 404,
        type: WrongUserNameResponse
    })
    @ApiResponse({
        status: 400,
        type: WrongPasswordResponse
    })
    @AllowAnonymous()
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginUserDto){
        return await this.authServices.login(loginDto)
    }

    @ApiResponse({
        status: 201,
        type: CreateUserResponse
    })
    @AllowAnonymous()
    @Post("signup")
    async signup(@Body() signupDto: CreateUserDto){
        return await this.authServices.signup(signupDto);
    }


    @ApiResponse({
        status: 200,
        type: LoginResponse
    })
    @AllowAnonymous()
    @Post("refresh-token")
    @HttpCode(HttpStatus.OK)
    public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto){
        return await this.authServices.refreshToken(refreshTokenDto);     
    }

}
