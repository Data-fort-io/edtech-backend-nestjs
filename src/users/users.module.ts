import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Profiles } from 'src/profiles/profile.entity';
import { AuthModule } from 'src/auth/auth.module';
import { HashingProvider } from 'src/auth/provider/hashing.provider';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { Tracks } from 'src/entities/track .entity';

@Module({
  providers: [UsersService,],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([Users, Profiles, Tracks]),
    forwardRef(()=> AuthModule),
    forwardRef(()=> ProfilesModule)
  ],
  exports: [UsersService]
})
export class UsersModule {}
