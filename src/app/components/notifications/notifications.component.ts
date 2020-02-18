import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { WebsocketService } from '../../service/websocket.service'
import { UserService } from '../../service/user.service';
import { NotificationService } from '../../service/notification.service';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  UserId: any;
  Role: any;
  search_word;

  constructor(private wsService: WebsocketService,
    private _notificationService: NotificationService,
    private us: UserService ) {
      this.getNotificactions();
      this.getUserDetails();
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

      this.search.valueChanges.pipe(debounceTime(600)).subscribe(value => {this.searchEmitter.emit(value);
        this.getNotificactions(value);
      
      })
  }

  getNotificactions(value?){
    this._notificationService.getAll().subscribe(
      res => {
        this.notifications = res['notifications'];
        if (value) {
          console.log('search ', value);
          this.notifications = this.notifications.filter((e) => e.sender.name.toLowerCase() == value.toLowerCase())
        }
        
      },
      err => {
        console.log(err);
      }
    );
  }

  search = new FormControl('');
  @Output('search') searchEmitter =  new EventEmitter<string>();

}
