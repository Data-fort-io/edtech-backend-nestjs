import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
    constructor(
        private readonly configService: ConfigService
    ){}

    getUsers(){
        const env = this.configService.get('ENV_MODE')
        console.log(env)
    }
}
