import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let options = {
      strings: [
      "Transporte de carga",
      "Alquiler de grúas",
      "Maquinaria amarilla",
      "Operarios de cargue",
      "Operarios de descargue",],
      typeSpeed: 50,
      backSpeed: 20,
      showCursor: true,
      cursorChar: "|",
      loop:true
    }

    let typed = new Typed(".typing-element", options);
  }
}
