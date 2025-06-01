import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notifications } from './entity/notifications.entities';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notifications)
        private notificationsRepo: Repository<Notifications>
    ){}

    // get all user notifications
    public async getAllNotifications(userId: number){

        try {
            // Get all the notifications from the table where the id is equal the user id
            const userNotifications = await this.notificationsRepo.find({
                where: { users: { id: userId}},
            });

            if(!userNotifications){
                throw new NotFoundException("There are no notification")
            }

            // Map out just the notification data 
            const notifications = userNotifications.map( notification => ({
                id: notification.id,
                message: notification.message,
                read: notification.read,
                createdAt: notification.createdAt
            }))

            return notifications;
            
        } catch (error) {
            if(error.code === "ECONNECTIONREFUSED"){
                throw new RequestTimeoutException("An error has occured. Please try again", {
                    description: "Could not connect to the data base"
                })
            }
            
            throw error
        }
        
        
    }

    //Read notifications
    public async readNotification(notificationId, userId){
        try {

            //Get the the notification by notification Id and the user Id
            const notification = await this.notificationsRepo.findOne({
                where: { 
                    id: notificationId,
                    users: { id: userId}
                 }
            })

            //If it does not exist throw an error
            if(!notification){
                throw new NotFoundException("Notification not found")
            }

            //Update the read status to true
            notification.read = true;
            
            //Save the updated profile
            return await this.notificationsRepo.save(notification)
            
        } catch (error) {
            if(error.code === "ECONNECTIONREFUSED"){
                throw new RequestTimeoutException("An error has occured. Please try again", {
                    description: "Could not connect to the data base"
                })
            }
            
            throw error            
        }

    }

}
