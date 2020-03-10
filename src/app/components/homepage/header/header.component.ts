import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  ngOnInit() {
    this.access = localStorage.getItem('token');
    this.access2 = localStorage.getItem('Client');
  }
  access: string;
  access2: string;
  constructor(public router: Router) {
  }
}
