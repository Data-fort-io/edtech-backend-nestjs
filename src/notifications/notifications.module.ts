import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Users } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notifications } from './entity/notifications.entities';

@Module({
  providers: [NotificationsService],
  imports: [
    TypeOrmModule.forFeature([Users, Notifications])
  ],
  exports: [NotificationsService]
})
export class NotificationsModule {}
