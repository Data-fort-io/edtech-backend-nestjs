import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Profiles } from 'src/profiles/profile.entity';
import { AuthModule } from 'src/auth/auth.module';
import { HashingProvider } from 'src/auth/provider/hashing.provider';

@Module({
  providers: [UsersService,],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([Users, Profiles]),
    forwardRef(()=> AuthModule),
  ],
  exports: [UsersService]
})
export class UsersModule {}
