import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  access: string;
  access2: string;
  constructor(public router: Router) {
  }
  ngOnInit() {
    this.access = localStorage.getItem('token');
    this.access2 = localStorage.getItem('Client');

    console.log('tiene sesion inicicada: ', this.access, '+', this.access2);
  }
}
