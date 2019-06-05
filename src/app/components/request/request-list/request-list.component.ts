import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../service/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html'
})
export class RequestListComponent implements OnInit {
  requests: any;
  requestsOnProgress: any;
  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.getAllRequest();
    this.getAllRequestOnProgress();
  }


  public getAllRequestOnProgress() {
    this.requestService.getRequests().subscribe(
      res => {
        this.requestsOnProgress = res['requests'];
        console.log(res['requests']);
        this.requestsOnProgress = this.requestsOnProgress.filter((e) => e.estado === 'en proceso');
        console.log(this.requestsOnProgress);
      },
      err => {
        console.log(err);
      }
    );
  }


  public getAllRequest() {
    this.requestService.getRequests().subscribe(
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
}
