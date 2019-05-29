import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'admin-app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css']
})
export class AdminRequestCardComponent implements OnInit {
  @Input() request: any = {};
  constructor() { }

  ngOnInit() {
  }

}
