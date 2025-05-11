import { CreateUserDto } from "./createUser.dto";
import { PickType } from '@nestjs/mapped-types'


export class LoginUserDto extends PickType(CreateUserDto, ['username', 'password'] as const){}