import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../../service/request.service';
import { WebsocketService } from '../../../../service/websocket.service'
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-admin-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class AdminRequestListComponent implements OnInit {
  requests: any;
  requestOnProgress: any;
  onProgress = true;
  UserId: any;

  constructor(
    private requestService: RequestService,
    private us: UserService,
    private wsService: WebsocketService ) {
    this.getUserDetails();
  }

  ngOnInit() {
    this.getAllAdminRequest()
    this.getAllAdminRequestOnProgress()


    this.wsService.listen('new-notifications')
      .subscribe((res: any) => {
        if(res.receiver == this.UserId) {
          this.getAllAdminRequest();
        }
      });
  }

  getUserDetails() {
    this.us.getUserProfile().subscribe(
      res => {
        this.UserId = res['user']._id;
      },
      err => {
        console.log(err);
      }
    )
  }

  public getAllAdminRequest() {
    this.requestService.getAdminRequests().subscribe(
      res => {
        this.requests = res['requests'];
        this.requests = this.requests.filter((e) => e.estado === 'recibido');
        console.log(res['requests']);
      },
      err => {
        console.log(err);
      }
    );
  }

  public toggleMenuPending() {
    this.onProgress = false;
  }

  public toggleMenuOnProgress() {
    this.onProgress = true;
  }

  public getAllAdminRequestOnProgress() {
    this.requestService.getAdminRequests().subscribe(
      res => {
        this.requestOnProgress = res['requests'];
        this.requestOnProgress = this.requestOnProgress.filter((e) => e.estado === 'en proceso');
        console.log(res['requests']);
      },
      err => {
        console.log(err);
      }
    );
  }

}
