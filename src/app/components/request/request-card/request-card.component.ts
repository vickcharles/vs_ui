import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html'
})
export class RequestCardComponent implements OnInit {
  @Input() request: any = {};
  constructor() { }

  ngOnInit() {
  }

}
