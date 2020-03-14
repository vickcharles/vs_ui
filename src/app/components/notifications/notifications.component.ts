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
  typeUser;

  constructor(private wsService: WebsocketService,
    private _notificationService: NotificationService,
    private us: UserService ) {
    }

    

  ngOnInit() {
    this.getNotificactions();
      this.getUserDetails();
      
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
  getUserDetails() {
    this.us.getUserProfile().subscribe(
      res => {
        console.log('datos del usuraio asjkdhbksajd', res, '+', res['user'].role);
        this.UserId = res['user']._id
        this.Role = res['user'].role

        if (this.Role === "ADMIN") {
          this.typeUser = 'cliente';
        }else {this.typeUser = 'comercial';}
      },
      err => {
        console.log(err);
      }
    )
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
