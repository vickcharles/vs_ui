import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { UserService } from '../../service/user.service';
import { RequestService } from '../../service/request.service';
import { ScrollTopService } from '../../service/scrollToTop.service';
import { Router } from "@angular/router";
import { MustMatch, typeOfService, destination } from '../../validators/password-match';
import { MatSnackBar } from '@angular/material';
import { WebsocketService } from '../../service/websocket.service'
import { MatRadioChange } from '@angular/material';

import { CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { HelpersService } from '../../../app/service/helpers.service';
import { promise } from 'protractor';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  @ViewChild('zohoIframe', null) zohoIframe: ElementRef;

  public zohoIframeSrc: string = '';

  selectedIndex = 0;
  credentials: FormGroup;
  isLinear = false;
  isRegistered = false;
  serverErrorMessages: String;
  request: FormGroup;
  user: FormGroup;
  isOptional= false;

  checkbox = false;

  isLoading: Boolean = false;
  errors: any = {
    tipoDeServicio: String
  };
  data: any;
  submitted = false;
  isCreatingRequest = false;
  digito: any;
  enable = true;

  freightForwarding = [
    {id: 'transporte de carga seca', name: 'Transporte de carga seca'}, 
    {id: 'transporte de contenedores', name: 'Transporte de contenedores'}, 
    {id: 'transporte refrigerado', name: 'Transporte refrigerado'}, 
    {id: 'transporte de carga extradimensionada', name: 'Transporte de carga extradimensionadas'}
  ]

  craneRental = [
    {id: 'gruá', name: 'Grúa' },
    {id: 'gruá telescopica', name: 'Grúa telescópica' },
    {id: 'gruá de gancho', name: 'Grúa de gancho' },
    {id: 'gruá autodescargable', name: 'Grúa auto-descargable' },
    {id: 'telehandler', name: 'Telehandler' },
    {id: 'ManLift', name: 'ManLift' },
  ]

  forkliftRental =[
    {id: '1', name: '1' },
    {id: '2', name: '2' },
    {id: '3', name: '3' },
    {id: '4', name: '4' },
    {id: '5', name: '5' },
    {id: '6', name: '6' },
    {id: '7', name: '7' },
    {id: '8', name: '8' },
    {id: '9', name: '9' },
    {id: '10', name: '10' },
    {id: '11', name: '11' },
    {id: '12', name: '12' },
    {id: '13', name: '13' },
    {id: '14', name: '14' },
    {id: '15', name: '15' },
    {id: '16', name: '16' },
  ]

  customerType = [
    {id: 'empresa', name: 'Empresa'},
    {id: 'natural', name: 'Persona natural'},
  ]

  getIndex() {
    localStorage.getItem('tipoDeServicio') !== '' ? this.selectedIndex === 1 : this.selectedIndex === 0;
  }

  constructor(
    private next: ActivatedRoute,
    private snackBar: MatSnackBar,
    private wsService: WebsocketService,
    private userService: UserService,
    private requestService: RequestService,
    private router: Router,
    private helpers: HelpersService,
    private formBuilder: FormBuilder) {
    this.next.data.subscribe(v =>
      this.isCreatingRequest = v.isRequesting
    );
  }


  radioChange(event: MatRadioChange) {
    setTimeout(() => {
      this.stepper.selectedIndex = 1
    },0);
  };


  getForm(id) {
    switch (id) {
      case 'todos':
        localStorage.setItem('tipoDeServicio', '')
        break;
      case 'transporte-de-carga':
        localStorage.setItem('tipoDeServicio', 'transporte de carga')
        break;
      case 'alquiler-de-grúa':
        localStorage.setItem('tipoDeServicio', 'alquiler de grúa')
        break;
      case 'alquiler-de-montacarga':
        localStorage.setItem('tipoDeServicio', 'alquiler de montacarga')
        break;
      case 'operario-de-cargue-y-descargue':
        localStorage.setItem('tipoDeServicio', 'operario de cargue y descargue')
        break;
      default:
      localStorage.setItem('tipoDeServicio', '');
    }
  }

  ngOnInit() {
    const id = this.next.snapshot.paramMap.get('id');
    this.getForm(id);

    const regexNoNumber = /^[A-Z\sñÑáéíóúÁÉÍÓÚ@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]*$/i;

    this.credentials = this.formBuilder.group({
      email: [''.toLowerCase(), Validators.required],
      password: ['', Validators.required],
    });

    this.request = this.formBuilder.group({
      tipoDeServicio: this.formBuilder.group({
        nombre: [localStorage.getItem('tipoDeServicio')],
        especificamente: ['']
      },
      {
        validators: typeOfService('nombre', 'especificamente'),
      }),
      cliente: this.formBuilder.group({
        tipo: ['', [Validators.required]],
        tipoDocumento: [''],
        documento: ['', [Validators.required, Validators.maxLength(11) ,Validators.pattern('^[0-9]*$')]],
        nombreEmpresa: ['', this.validateEmailNotTaken],
        digitoVerificacion: ['',[Validators.required]],
        digito2: ['']
      },
      {
        validator: MustMatch('digito2', 'digitoVerificacion')
      }),
      origen: ['', [Validators.required, Validators.pattern(regexNoNumber)]],
      destino: ['', [Validators.pattern(regexNoNumber)]],
      mensaje: ['', [Validators.required, Validators.maxLength(260)]]
    },
    {
      validators: destination('destino'),
    });

    this.user = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{7,10}')]],
      celular: ['', [Validators.required, Validators.pattern('^[3]+([0|1|2|5])+([0-9]{8,8})$'), Validators.pattern('[0-9]{10,10}')]],
      ciudad: ['', [Validators.required, Validators.pattern(regexNoNumber)]],
      correo: ['', [ Validators.required, Validators.pattern(/^[a-zA-Z0-9_\-\.~!#$%&'*+/=?^`{|}]{2,}@[a-zA-Z0-9_\-\.~]{2,}\.[a-zA-Z]{2,3}$/)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      autorizo: ['', Validators.required],
      contrasenaConfirmada: ['', Validators.required]
    },
    {
      validator: MustMatch('contrasena', 'contrasenaConfirmada')
    });
  }

  validateEmailNotTaken(datos: AbstractControl) {
    
    if (!datos.parent) {
      return null;
    }else {
      //console.log('ME ENTRO : ', datos.parent.controls);
      console.log('ME ENTRO : ', datos.parent.controls);
      if (datos.value) {
        
      }
    }
  }
  
  onCheckboxChange() {
    if (this.checkbox) {
      setTimeout(()=> {
        this.checkbox = !this.checkbox;
      })
    }
  }

  // Event fired after view is initialized
  @ViewChild('stepper', {static: false}) stepper: MatStepper;

  ngAfterViewInit() {
    if(localStorage.getItem('tipoDeServicio')) {
      setTimeout(() => {
        this.stepper.selectedIndex = 1
      },0);
    } else {
      setTimeout(() => {
        this.stepper.selectedIndex = 0
      },0);
    }
  }


  login(credentials: any) {
    let valueE = credentials.get('email').value

    credentials.get('email').setValue(valueE.toLowerCase());

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
    this.submitted = false;
    this.serverErrorMessages = "";
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

        //EMITIR NOTIFICACION AL CLIENTE
        let payload = {
          userId: res['request'].usuario._id,
          receiver: res['request'].operadorId._id,
          message: 'ha creado una nueva solicitud',
        }
        console.log('verificando login crm', res['request']);
        let payloadParse = {
          request: res['request'],
          user: {nombre: res['request'].usuario.name,
            apellido: res['request'].usuario.lastName,
            telefono: res['request'].usuario.phone,
            celular: res['request'].usuario.cellPhone,
            ciudad: res['request'].usuario.city,
            correo: res['request'].usuario.email,
          }
        }
        
          var payloadZoho = this.helpers.parseData(payloadParse);
            this.launchZohoIframe(payloadZoho.zoho);

        this.requestService.sendSMSendEmail(res['request'])
        .then(res => {
          console.log('mensaje enviado al usuario: ' + res.status)
        })
        .catch(err => {
          console.log('error al envair mensaje de texto: ' + err)
        })

        console.log(payload);

        this.wsService.emit('notifications', payload);
        debugger;
        this.sendAPI();

        setTimeout(() => {
          this.router.navigate(['/dashboard/request/' + res['request']._id]);
          this.openSnackBar();
        }, 5000);
      },
      err => {
        console.log('Error creando request');
        this.serverErrorMessages = err.error.message;
      }
    );
  }

  register() {
    this.submitted = true;

    //Email to lowercase before save
    let valueEmail = this.user.get('correo').value
    this.user.get('correo').setValue(valueEmail.toLowerCase());

    if(this.user.valid && !this.isRegistered) {
      this.isLoading = true;

      this.data = {
        user: this.user.value,
        request: this.request.value
      }

        this.sendAPI();
      //loggin if user is registered
    } else if (this.credentials.valid && this.isRegistered) {

      // let valueE = this.credentials.get('email').value

      // this.credentials.get('email').setValue(valueE.toLowerCase());

      this.userService.login(this.credentials.value).subscribe(
        res => {
          this.isLoading = false;
          this.userService.setToken(res['token']);
          console.log('datos usuario ya registrado: ', this.request.value);
          this.createRequest(this.request.value);
        },
        err => {
          this.isLoading = false;
          this.serverErrorMessages = err.error.message;
        }
      );
    }
  }

  sendAPI(){
    this.userService.postUserAndRequest(this.data).subscribe(
      res => {
        this.userService.setToken(res['token']);

       //EMITIR NOTIFICACION AL CLIENTE
        let payload = {
          userId: res['request'].usuario._id,
          receiver: res['request'].operadorId._id,
          message: 'ha creado una nueva solicitud',
        }
         
        console.log('datos del payload', this.data);
        var payloadZoho = this.helpers.parseData(this.data);
            this.launchZohoIframe(payloadZoho.zoho);

        this.requestService.sendSMSendEmail(res['request'])
        .then(res => {
          console.log('mensaje enviado al usuario: ' + res.status)
          
        })
        .catch(err => {
          console.log('error al enviar mensaje de texto: ' + err)
        })
        

        this.wsService.emit('notifications', payload)

        setTimeout(() => {
        this.router.navigate(['/dashboard/request/' + res['request']._id]);
        this.openSnackBar();
        this.isLoading = false;
      }, 5000);
      },
      err => {
        if (err.status === 422) {
          this.isLoading = false;
          this.serverErrorMessages = 'ya existe un usuario registrado';
        }
        else
          this.isLoading = false;
          this.serverErrorMessages = 'ya existe un usuario registrado';
      }
    );
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

  launchZohoIframe(data){
      //debugger;
      console.log('CRM: ', data);
    data.submitNow = true;
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    //console.log(queryString);
    this.zohoIframeSrc = `/zoho-forms/basic-quote?${queryString}`;
    //const iframe = this.elementRef.nativeElement.querySelector('iframe');
    console.log('CRM data url: ', this.zohoIframeSrc);
    this.zohoIframe.nativeElement.src = this.zohoIframeSrc;

  }



  calcularDigitoVerificacion ( myNit )  {
    let vpri,
        x,
        y,
        z;
    
    // Procedimiento
    vpri = new Array(16) ; 
    myNit = String(myNit);
    z = myNit.length;
  
    vpri[1]  =  3 ;
    vpri[2]  =  7 ;
    vpri[3]  = 13 ; 
    vpri[4]  = 17 ;
    vpri[5]  = 19 ;
    vpri[6]  = 23 ;
    vpri[7]  = 29 ;
    vpri[8]  = 37 ;
    vpri[9]  = 41 ;
    vpri[10] = 43 ;
    vpri[11] = 47 ;  
    vpri[12] = 53 ;  
    vpri[13] = 59 ; 
    vpri[14] = 67 ; 
    vpri[15] = 71 ;
  
    x = 0 ;
    y = 0 ;
    for  ( let i = 0; i < z; i++ )  { 
      y = ( myNit.substr (i, 1 ) ) ;
      x += ( y * vpri [z-i] ) ;  
    }
    y = x % 11 ;
    this.digito=(( y > 1 ) ? 11 - y : y);
    console.log('este es el numero de verificacion correcto'+this.digito);
    return this.digito;
  }
  
  // Calcular
  calcular(dato) {
    this.request.get('cliente').get('digito2').setValue('');
    this.request.get('cliente').get('digitoVerificacion').setValue('');
    console.log('este es el numero que envia: '+dato);
    this.calcularDigitoVerificacion(dato);
  }

  calcular2() {
    this.request.get('cliente').get('digito2').setValue(1);
    this.request.get('cliente').get('digitoVerificacion').setValue(1);
  }

  getErrorMessage(campo: string, form: string) {
    return this.request.get(`${campo}`).hasError('required')
      ? 'Este campo es requerido'
      : this.request.get(`${campo}`).hasError('pattern') 
          ? 'Introduce un dato válido' 
          : this.request.get(`${campo}`).hasError('mustMatch') 
              ? 'Error dígito de verificación' 
              : this.request.get(`${campo}`).hasError('emptyCampTypeOfService') 
                  ? 'Este campo no puede estar vacio' 
                  : this.request.get(`${campo}`).hasError('emptyCampDestination') 
                      ? 'Este campo es requerido' 
                      : ''
  }

  getErrorMessage1(campo: string, form: string) {
    return this.request.get('tipoDeServicio').get(`${campo}`).hasError('emptyCampTypeOfService') 
            ? 'Este campo no puede estar vacio' 
            :  ''
  }

  getErrorMessage2(campo: string, form: string) {
    return this.request.get('cliente').get(`${campo}`).hasError('required')
      ? 'Este campo es requerido'
      : this.request.get('cliente').get(`${campo}`).hasError('pattern') 
        ? 'Introduce un dato válido' 
          : this.request.get('cliente').get(`${campo}`).hasError('mustMatch') 
            ? 'Las contraseñas deben coincidir' 
            : '';
  }

  getErrorMessage3(campo: string, form: string) {
    return this.user.get(`${campo}`).hasError('required')
      ? 'Este campo es requerido'
      : this.user.get(`${campo}`).hasError('pattern') 
        ? 'Introduce un dato válido' 
        : this.user.get(`${campo}`).hasError('maxlength') 
          ? 'Máximo límite de caracteres 10' 
          : this.user.get(`${campo}`).hasError('mustMatch') 
            ? 'Las contraseñas deben coincidir' 
            : this.user.get(`${campo}`).hasError('minlength') 
              ? 'Mínimo límite de caracteres 6' 
              : '';
  }
}
