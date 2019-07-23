import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {}

  setTipoDeServicio(tipoDeServicio: any) {
    localStorage.setItem('tipoDeServicio', tipoDeServicio)
    this.router.navigate(['/solicitar-servicio'])
  }

};

