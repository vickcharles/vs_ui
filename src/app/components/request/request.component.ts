import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ControlContainer } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { UserService } from '../../service/user.service';
import { RequestService } from '../../service/request.service';
import { ScrollTopService } from '../../service/scrollToTop.service';
import { Router } from "@angular/router";
import { MustMatch, typeOfService, destination, EnterpriseValidation, specification2 } from '../../validators/password-match';
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
  isRegistered = true;
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
  isCreatingRequest2 = false;
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
    {id: '1', name: '1 - 5 toneladas' },
    {id: '2', name: '6 - 10 toneladas' },
    {id: '3', name: '11 - 15 toneladas' },
    {id: '4', name: '16 - 20 toneladas' },
    {id: '5', name: '21 - 25 toneladas' },
    {id: '6', name: '26 - 30 toneladas' },
    {id: '7', name: '31 - 35 toneladas' },
    {id: '8', name: '36 - 40 toneladas' },
    {id: '9', name: '41 - 45 toneladas' },
    {id: '10', name: '46 - 50 toneladas' },
    {id: '11', name: '51 - 55 toneladas' },
    {id: '12', name: '56 - 60 toneladas' },
  ]

  customerType = [
    {id: 'empresa', name: 'Empresa'},
    {id: 'natural', name: 'Persona natural'},
  ]
  selectedTypeService: string | AbstractControl;

  arrayImg = [
    {id: 0, urlImg: '../../../assets/img/banner_services/Transporte de carga-12.jpg', type: 'transporte de carga' },
    {id: 1, urlImg: '../../../assets/img/banner_services/grua-12.jpg', type: 'alquiler de grúa' },
    {id: 2, urlImg: '../../../assets/img/banner_services/MONTACARGA-12.jpg', type: 'alquiler de montacarga' },
    {id: 3, urlImg: '../../../assets/img/banner_services/operario-12.jpg', type: 'operario de cargue y descargue' },
  ]
  selectedImgTypeService: string;
  dataSession: string;
  enterprise: boolean = false;
  textCheck: string = 'de la Cédula o Nit';

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
    this.dataSession = localStorage.getItem('Client');
    const id = this.next.snapshot.paramMap.get('id');
    this.getForm(id);

    const regexNoNumber = /^[A-Z\sñÑáéíóúÁÉÍÓÚ@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]*$/i;

    this.credentials = this.formBuilder.group({
      email: [''.toLowerCase(), [ Validators.required, Validators.pattern(/^[a-zA-Z0-9_\-\.~!#$%&'*+/=?^`{|}]{2,}@[a-zA-Z0-9_\-\.~]{2,}\.[a-zA-Z]{2,3}$/)]],
      password: ['', Validators.required],
    });

    this.request = this.formBuilder.group({
      tipoDeServicio: this.formBuilder.group({
        nombre: [localStorage.getItem('tipoDeServicio')],
        especificamente: [''],
        especificamente2: [''],
      },
      {
        validators: [typeOfService('nombre', 'especificamente'), specification2('nombre', 'especificamente2')],
      }),
      cliente: this.formBuilder.group({
        tipo: ['empresa'],
        tipoDocumento: [''],
        documento: ['', [Validators.required, Validators.maxLength(11) ,Validators.pattern('^[0-9]*$')]],
        nombreEmpresa: [''],
        nombreEmpresaVerificacion: [''],
        digitoVerificacion: ['',[Validators.required]],
        digito2: ['']
      },
      {
        validators: [MustMatch('digito2', 'digitoVerificacion'), EnterpriseValidation('nombreEmpresaVerificacion', 'nombreEmpresa')],
      }),
      origen: ['', [Validators.required, Validators.pattern(regexNoNumber)]],
      destino: ['', [Validators.pattern(regexNoNumber)]],
      mensaje: ['', [Validators.required, Validators.maxLength(260)]],
      confirmacion: [''],
    },
    {
      validators: destination('destino')
    });

    this.user = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{7,10}')]],
      celular: ['', [Validators.required, Validators.pattern('^[3]+([0|1|2|5])+([0-9]{8,8})$'), Validators.pattern('[0-9]{10,10}')]],
      ciudad: ['', [Validators.required, Validators.pattern(regexNoNumber)]],
      correo: ['', [ Validators.required, Validators.pattern(/^[a-zA-Z0-9_\-\.~!#$%&'*+/=?^`{|}]{2,}@[a-zA-Z0-9_\-\.~]{2,}\.[a-zA-Z]{2,3}$/)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      autorizo: [false],
      contrasenaConfirmada: ['', Validators.required]
    },
    {
      validator: MustMatch('contrasena', 'contrasenaConfirmada')
    });
    this.imgService();
  }

  // validateConfirmation(control:FormGroup) {
  //   const password = '';
  //   var ControlName = control.controls.tipoDeServicio.value.nombre;
  //   var ControlName2 = control.controls.confirmacion;
  //   console.log('datos erroneos en validation', ControlName2.value, '+ ', ControlName2.touched, '=', ControlName2 );

  //   if ( ControlName == 'transporte de carga' && ControlName2.value && !ControlName2.touched ) {
      
  //     ControlName2.setErrors(null);
  //     console.log('entra aqui 1');
  //   }
  //   if ( ControlName == 'transporte de carga' && ControlName2.value === '' ) {
  //     if (!ControlName2.untouched) {
  //       ControlName2.setErrors({ emptyCampConfirmation: false });
  //     console.log('entra aqui 2');
  //     }else{
  //       ControlName2.setErrors({ emptyCampConfirmation: true });
  //       console.log('entra aqui 2');
  //     }
      
  //   }

  //   if ( ControlName == 'transporte de carga' && ControlName2.value === false && !ControlName2.touched ) {
  //     ControlName2.setErrors({ emptyCampConfirmation: true });
  //     console.log('entra aqui 3');
  //   }
  // }

  imgService(){
    if (this.request.get('tipoDeServicio')) {
      for (let index = 0; index < this.arrayImg.length; index++) {
        
        if (this.arrayImg[index].type == this.request.get('tipoDeServicio').get('nombre').value) {
          this.selectedImgTypeService = this.arrayImg[index].urlImg ;
        }
        
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

        this.wsService.emit('notifications', payload);
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
      return this.errors = '';
  };

  public nextStep(stepper: MatStepper) {

    if (this.request.get('tipoDeServicio').get('nombre').value == 'transporte de carga') {
      this.request.get('confirmacion').clearValidators();
      this.request.get('confirmacion').setValidators(Validators.required);
      this.request.get('confirmacion').updateValueAndValidity();
    }else{
      this.request.get('confirmacion').clearValidators();
      this.request.get('confirmacion').updateValueAndValidity();
    }
    
    
    if (this.request.valid) {
    this.submitted = true;
    let errors = this.validar();
    const errorsArray: any = Object.values(errors);
    const isError = errorsArray.some(value => value);

    if(!isError && this.request.valid) {
      stepper.next();
      this.submitted = false;
    }
  }else{}
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
    data.submitNow = true;
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    this.zohoIframeSrc = `/zoho-forms/basic-quote?${queryString}`;
    //const iframe = this.elementRef.nativeElement.querySelector('iframe');
    this.zohoIframe.nativeElement.src = this.zohoIframeSrc;
  }



  calcularDigitoVerificacion ( myNit )  {
    let vpri,
        x,
        y,
        z;
    
    // Procedimiento
    vpri = new Array(16) ; 
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
  calcular(dato = '0') {
    this.request.get('cliente').get('digitoVerificacion').setValue('');
    this.request.get('cliente').get('nombreEmpresa').setValue('');
    console.log('dasijaskhdnas', this.textCheck);
    if (dato.startsWith('90') || dato.startsWith('89')) {
        this.enterprise = true;
        this.textCheck = ' del Nit';
    }else{
        this.enterprise = false;
        if (dato == '0' || !dato || dato == '') {
          this.textCheck = 'de la Cédula o Nit';
        }else{
          this.textCheck = 'de la Cédula';
        }
    }
    this.calcularDigitoVerificacion(dato);
  }


  autoCompleteDataClient(){
    if (this.request.get('tipoDeServicio').get('nombre').value == 'transporte de carga') {
      this.request.get('confirmacion').clearValidators();
      this.request.get('confirmacion').setValidators(Validators.required);
      this.request.get('confirmacion').updateValueAndValidity();
    }else{
      this.request.get('confirmacion').clearValidators();
      this.request.get('confirmacion').updateValueAndValidity();
    }
    if (this.request.valid) {
      console.log(this.request.value)

    this.isCreatingRequest2 = true;
    this.userService.getUserProfile().subscribe(
      res => {
        this.request = res['user'];
      },
      err => {
        console.log(err);
      }
    )
    this.createRequest(this.request.value);
    }
    else{
    }

    
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
                      ? 'Este campo es requerido' : ''
  }

  getErrorMessage1(campo: string, form: string) {
    return this.request.get('tipoDeServicio').get(`${campo}`).hasError('emptyCampTypeOfService') 
            ? 'Este campo no puede estar vacio' 
            :  this.request.get('tipoDeServicio').get(`${campo}`).hasError('emptyCampSpecification2') 
            ? 'Este campo no puede estar vacio' 
            : ''
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
  getErrorMessage21(campo: string, form: string) {
    return this.request.get('cliente').get(`${campo}`).hasError('required')
        ? 'Este campo es requerido'
        : this.request.get('cliente').get(`${campo}`).hasError('mustMatch') 
            ? 'Error dígito de verificación'
            : this.request.get('cliente').get(`${campo}`).hasError('enterpriseValidation') 
                ? 'Ingresa el nombre de la empresa' : '';
            
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

  getErrorMessage0(campo: string, form: string) {
    return this.credentials.get(`${campo}`).hasError('required')
        ? 'Este campo es requerido' : 
        this.credentials.get(`${campo}`).hasError('pattern') 
            ? 'Ingresa un correo válido' : ''
  }

  nitOrRut(){
    console.log(this.request.get('cliente').get('documento').value);
    if (this.request.get('cliente').get('digitoVerificacion')) {

      
    }
  }
}
