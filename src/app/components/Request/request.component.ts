import {Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { UserService } from '../../service/user.service';
import { RequestService } from '../../service/request.service';
import { Router } from "@angular/router";
import { MustMatch } from '../../validators/password-match';
import { MatSnackBar } from '@angular/material';
import { WebsocketService } from '../../service/websocket.service'

import { CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  credentials: FormGroup;
  isLinear = false;
  isRegistered = false;
  serverErrorMessages: String;
  request: FormGroup;
  user: FormGroup;
  isOptional= false;

  isLoading: Boolean = false;
  errors: any = {
    tipoDeServicio: String
  };
  data: any;
  submitted = false;
  isCreatingRequest = false;


  constructor(
    private next: ActivatedRoute,
    private snackBar: MatSnackBar,
    private wsService: WebsocketService,
    private userService: UserService,
    private requestService: RequestService,
    private router: Router, private formBuilder: FormBuilder) {
    this.next.data.subscribe(v =>
      this.isCreatingRequest = v.isRequesting
    );
  }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email: [''.toLowerCase(), Validators.required],
      password: ['', Validators.required],
    });

    this.request = this.formBuilder.group({
      tipoDeServicio: this.formBuilder.group({
        nombre: ['', Validators.required],
        especificamente: ['']
      }),
      cliente: this.formBuilder.group({
        tipo: ['', Validators.required],
        tipoDocumento: [''],
        documento: ['', [Validators.required, Validators.maxLength(11) ,Validators.pattern('^[0-9]*$')]],
        nombreEmpresa: ['']
      }),
      origen: ['', [ Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      destino: ['', Validators.pattern('^[a-zA-Z ]*$')],
      mensaje: ['', [Validators.required, Validators.maxLength(160), Validators.pattern('^[a-zA-Z ]*$')]]
    });

    this.user = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
      ciudad: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      correo: ['', [ Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      contrasenaConfirmada: ['', Validators.required]
    },
    {
      validator: MustMatch('contrasena', 'contrasenaConfirmada')
    });
  }


  login(credentials: any) {
    this.userService.login(credentials).subscribe(
      res => {
        this.userService.setToken(res['token']);
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

  toggleForm() {
    this.isRegistered = !this.isRegistered;
    console.log(this.isRegistered);
  }

  openSnackBar() {
    this.snackBar.open('Solicitud enviada satisfactoriamete', 'ok', {
      duration: 4000,
      horizontalPosition: 'left'
    });
  }

  createRequest(request: any): any {
    this.requestService.postRequest(request).subscribe(
      res => {
        this.openSnackBar();

        //EMITIR NOTIFICACION AL CLIENTE
        let payload = {
          userId: res['request'].usuario._id,
          receiver: res['request'].operadorId._id,
          message: 'ha creado una nueva solicitud',
        }

        console.log(payload);

        this.wsService.emit('notifications', payload);

        this.router.navigateByUrl('/dashboard/request/' + res['request']._id);
        this.router.navigateByUrl('/dashboard/request/' + res['request']._id);
      },
      err => {
        console.log('Error creando request');
        this.serverErrorMessages = err.error.message;
      }
    );
  }

  register() {
    this.submitted = true;

    if(this.user.valid && !this.isRegistered) {
      this.isLoading = true;

      this.data = {
        user: this.user.value,
        request: this.request.value
      }

      this.userService.postUserAndRequest(this.data).subscribe(
        res => {
          this.isLoading = false;
          this.userService.setToken(res['token']);
    

         //EMITIR NOTIFICACION AL CLIENTE
          let payload = {
            userId: res['request'].usuario._id,
            receiver: res['request'].operadorId._id,
            message: 'ha creado una nueva solicitud',
          }

          this.wsService.emit('notifications', payload)

          this.router.navigateByUrl('/dashboard/request/' + res['request']._id);
          this.openSnackBar();
        },
        err => {
          if (err.status === 422) {
            this.isLoading = false;
            this.serverErrorMessages = err.error.join('<br/>');
          }
          else
            this.isLoading = false;
            this.serverErrorMessages = 'Something went wrong. Please contact admin.' + err;
        }
      );
      //loggin if user is registered
    } else if (this.credentials.valid && this.isRegistered) {
      this.userService.login(this.credentials.value).subscribe(
        res => {
          this.isLoading = false;
          this.userService.setToken(res['token']);
          this.createRequest(this.request.value);
        },
        err => {
          this.isLoading = false;
          this.serverErrorMessages = err.error.message;
        }
      );
    }
  }

  //Validaciones
  public validar() {
    if(this.request.value.tipoDeServicio.nombre == "transporte de carga" &&
      !this.request.value.tipoDeServicio.especificamente) {
        this.errors.tipoDeServicio = 'Este campo es requerido';
    } else {
       this.errors.tipoDeServicio = '';
    }
    if(this.request.value.tipoDeServicio.nombre == "alquiler de grua" &&
      !this.request.value.tipoDeServicio.especificamente) {
        this.errors.tipoDeServicio = 'Este campo es requerido';
    } else {
      this.errors.tipoDeServicio = '';
    }

    if (this.request.value.cliente.tipo == 'empresa'
      && this.request.value.cliente.nombreEmpresa == '') {
      this.errors.nombreEmpresa = 'Este campo es requerido';
    } else {
      this.errors.nombreEmpresa = '';
    }
      return this.errors;
  };

  public nextStep(stepper: MatStepper) {
    this.submitted = true;
    let errors = this.validar();
    const errorsArray: any = Object.values(errors);
    const isError = errorsArray.some(value => value);

    if(!isError && this.request.valid) {
      stepper.next();
      this.submitted = false;
    }
  }

  nextCreateRequest() {
    this.submitted = true;
    let errors = this.validar();
    const errorsArray: any = Object.values(errors);
    const isError = errorsArray.some(value => value);
    if(!isError && this.request.valid) {
      this.createRequest(this.request.value);
    }
  }
}


export default RequestComponent;