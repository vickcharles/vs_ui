import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../service/websocket.service'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any;
  constructor(private wsService: WebsocketService) {
    this.wsService.emit('listen-notifications');
    this.wsService.listen('new-notifications')
    .subscribe(res => {
      this.notifications = res
      console.log(this.notifications);
    });
  }

  ngOnInit() {
  }

}
