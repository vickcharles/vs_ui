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
  Role: any;

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
          this.Role = res['user'].role
        },
        err => {
          console.log(err);
        }
      )
    }

  ngOnInit() {
    this.wsService.listen('new-notifications')
      .subscribe((res: any) => {

        if(res.receiver == this.UserId) {
          console.log('NUEVA NOTIFICACION')
          console.log(res);
          this.notifications.unshift(res)
        }

      });
  }

}
