import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from "@angular/router";
// import { MatSnackBar } from '@angular/material';
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
    public ws: WebsocketService ) {
    }

  ngOnInit() {
    // this.openSnackBar();
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.displayName = res['user'].name + ' ' + res['user'].lastName;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  // openSnackBar() {
  //   this.snackBar.open('Message archived', 'Undo', {
  //     duration: 3000,
  //     horizontalPosition: 'left'
  //   });
  // }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/home']);
  }

}
