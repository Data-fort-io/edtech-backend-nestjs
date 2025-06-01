import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "./createUser.dto";
import { PickType } from '@nestjs/swagger'


export class LoginUserDto extends PickType(CreateUserDto, ['username', 'password'] as const){
    @IsString()
    @IsNotEmpty()
    password: string
}