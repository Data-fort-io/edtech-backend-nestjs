import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        public readonly userService: UsersService
    ){}

    @Get()
    getUsers(){
        this.userService.getUsers()
    }
}
