import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './provider/hashing.provider';
import { BcryptProvider } from './provider/bcrypt.provider';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/auth.config'
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [
    AuthService, 
    {
    provide: HashingProvider, 
    useClass: BcryptProvider}],
  controllers: [AuthController],
  imports: [ forwardRef(()=> UsersModule),
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync(authConfig.asProvider())
  ],
  exports: [HashingProvider]
})
export class AuthModule {}
