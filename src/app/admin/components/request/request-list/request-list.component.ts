import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../../service/request.service';

@Component({
  selector: 'app-admin-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class AdminRequestListComponent implements OnInit {
  requests: any;
  requestOnProgress: any;
  onProgress = true;


  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.getAllAdminRequest()
    this.getAllAdminRequestOnProgress()
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
        this.requestOnProgress = this.requestOnProgress.filter((e) => e.estado === 'en progreso');
        console.log(res['requests']);
      },
      err => {
        console.log(err);
      }
    );
  }

}
