import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profiles } from './profile.entity';
import { Users } from 'src/users/user.entity';

@Module({
  providers: [ProfilesService],
  exports: [ProfilesService],
  imports: [
    TypeOrmModule.forFeature([
      Profiles, Users
    ])
  ]
})
export class ProfilesModule {}
