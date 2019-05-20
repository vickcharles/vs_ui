import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css']
})
export class RequestCardComponent implements OnInit {
  @Input() request: any = {};
  constructor() { }

  ngOnInit() {
  }

}
