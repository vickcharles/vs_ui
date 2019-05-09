import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      tipoDeServicio: this.formBuilder.group({
        nombre: ['', Validators.required],
        especificamente: ['']
      }),
      cliente: this.formBuilder.group({
        tipo: ['', Validators.required],
        tipoDocumento: ['', Validators.required],
        documento: ['', Validators.required],
        nombreEmpresa: ['', Validators.required]
      }),
      nombre: ['', Validators.required],
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      mensaje: ['', Validators.required]

    });
    this.secondFormGroup = this.formBuilder.group({
      correo: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  public prueba() {
    console.log(this.firstFormGroup)
  }

}
