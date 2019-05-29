import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../service/request.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html'
})
export class RequestViewComponent implements OnInit {
  requestDetails: any;
  constructor(private requestService: RequestService, private actRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.getRequest(id);
  }

  public getRequest(id: any) {
    this.requestService.getRequest(id).subscribe(
      res => {
        this.requestDetails = res['request'];
        console.log(res['request']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
