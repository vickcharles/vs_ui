import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html'
})
export class RequestCardComponent implements OnInit {
  @Input() request: any = {};
  urlImgName: string;
  constructor() { }

  ngOnInit() {
    if (this.request.tipoDeServicio.nombre == 'alquiler de grúa') {
      this.urlImgName = 'alquiler de grua'
    }else{
      this.urlImgName = this.request.tipoDeServicio.nombre;
    }
  }

}


