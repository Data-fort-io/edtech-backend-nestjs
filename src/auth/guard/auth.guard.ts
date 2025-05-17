import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import authConfig from "../config/auth.config";
import { ConfigType } from "@nestjs/config";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService:JwtService,

        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,

        private readonly reflector: Reflector
    ){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        //read metadata
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass()
        ])

        if(isPublic){
            return true
        }

        //Extract request
        const request = context.switchToHttp().getRequest()

        //extract token
        const token = request.headers.authorization?.split(' ')[1]

        //validate the token
        if(!token){
            throw new UnauthorizedException()
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, this.authConfiguration)
            request["user"] = payload;
            
        } catch (error) {
            throw new UnauthorizedException()
        }

        return true;
    }

}