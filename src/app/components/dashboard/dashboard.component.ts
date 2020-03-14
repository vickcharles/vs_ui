import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from "@angular/router";
import { WebsocketService } from '../../service/websocket.service'
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetails: any;
  displayName: any;

  constructor(
    private userService: UserService,
    private socket: Socket,
    private router: Router,
    private ws: WebsocketService
  ) {}

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.displayName = res['user'].name + ' ' + res['user'].lastName;
        console.log(res);

        console.log('Datos del cliente');
        localStorage.setItem('Client', this.displayName);
      },
      err => {
        console.log(err);
      }
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/home']);
  }

}
