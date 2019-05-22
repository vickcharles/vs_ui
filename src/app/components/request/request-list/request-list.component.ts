import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../service/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html'
})
export class RequestListComponent implements OnInit {
  requests: any;
  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.getAllRequest();
  }

  public getAllRequest() {
    this.requestService.getRequests().subscribe(
      res => {
        this.requests = res['requests'];
        console.log(res['requests']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
