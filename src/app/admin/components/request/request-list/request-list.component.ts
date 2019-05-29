import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../../service/request.service';

@Component({
  selector: 'app-admin-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class AdminRequestListComponent implements OnInit {
  requests: any;
  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.getAllAdminRequest()
  }

  public getAllAdminRequest() {
    this.requestService.getAdminRequests().subscribe(
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
