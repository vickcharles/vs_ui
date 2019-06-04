import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../service/websocket.service'
import { UserService } from '../../service/user.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  UserId: any;
  constructor(private wsService: WebsocketService,
    private _notificationService: NotificationService,
    private us: UserService ) {
      this._notificationService.getAll().subscribe(
        res => {
          this.notifications = res['notifications']
        },
        err => {
          console.log(err);
        }
      );
      this.getUserDetails()
    }

    getUserDetails() {
      this.us.getUserProfile().subscribe(
        res => {
          this.UserId = res['user']._id
        },
        err => {
          console.log(err);
        }
      )
    }

  ngOnInit() {
    this.wsService.listen('new-notifications')
      .subscribe((res: any) => {
       console.log('NUEVA NOTIFICACIONES')
       console.log(res);
       console.log('USUARIO ID ' + this.UserId)

        if(res.receiver == this.UserId) {
          this.notifications.push(res)
        }

      });
  }

}
