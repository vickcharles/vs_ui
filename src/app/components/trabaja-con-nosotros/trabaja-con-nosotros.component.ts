import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-trabaja-con-nosotros',
  templateUrl: './trabaja-con-nosotros.component.html',
  styleUrls: ['./trabaja-con-nosotros.component.css']
})
export class TrabajaConNosotrosComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    let options = {
      strings: [
      "Si cuentas con un vehículo de carga, inscríbelo y trabaja con nosotros.",
      ],
      typeSpeed: 50,
      backSpeed: 20,
      showCursor: true,
      cursorChar: "|",
      loop: false
    }

    let typed = new Typed(".typing-element", options);
  }

}
