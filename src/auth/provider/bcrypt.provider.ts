import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from "bcrypt";

@Injectable()
export class BcryptProvider implements HashingProvider{
    public async hashPassword(password: string): Promise<string> {
        // generate a salt 
        let salt = await bcrypt.genSalt();

        //Hash the password
        return await bcrypt.hash(password, salt);
    }

    public async comparePassword(plainPassword: string, hashPassword: string): Promise<boolean> {
        
        return await bcrypt.compare(plainPassword, hashPassword);
    }
}
