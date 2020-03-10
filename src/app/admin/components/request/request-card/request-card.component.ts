import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'admin-app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css']
})
export class AdminRequestCardComponent implements OnInit {
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
