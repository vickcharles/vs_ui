import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apges',
  templateUrl: './pages.component.html',
})

export class PagesComponent implements OnInit {

  constructor(public router: Router) { }
  ngOnInit() {}

}

