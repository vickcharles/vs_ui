import { Component, OnInit } from '@angular/core';
import { NgxSoapService, Client, ISoapMethodResponse } from 'ngx-soap';
import { Router } from "@angular/router";
import { RequestService } from '../../../service/request.service';
import { from } from 'rxjs';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {
  client: Client;
  message: any;
  constructor(public router: Router, private http: HttpClient,
    private soap: NgxSoapService) {
      const promise = this.soap.createClient('assets/calculator.wsdl');
      from(promise).subscribe(client => this.client = client)
     }

  ngOnInit() {
  }

  setTipoDeServicio(tipoDeServicio: any) {
    localStorage.setItem('tipoDeServicio', tipoDeServicio)
    this.router.navigate(['/solicitar-servicio'])
  }

  calcular(){

    //como json
    const body = {
      root: {
        acceso: {
          username: 'GERENTE@3736',
          password: 'gerenteecont'
        },
        solicitud:{
          tipo: '6',
          procesoid: '26'
        },
        variables: 'RUTA,NOMBRERUTA,VALOR,VALORTONELADA,VALORHORA,DISTANCIA',
        documento: {
          PERIODO: '202003',
          CONFIGURACION: '3S3',
          ORIGEN: '11001000',
          DESTINO: '5001000',
          NOMBREUNIDADTRANSPORTE: 'ESTACAS',
          NOMBRETIPOCARGA: 'General'
        }
      }

    };

    //como xml
    const body2 = '<root><acceso> <username>GERENTE@3736</username> <password>gerenteecont</password></acceso><solicitud> <tipo>6</tipo> <procesoid>26</procesoid></solicitud><variables>RUTA,NOMBRERUTA,VALOR,VALORTONELADA,VALORHORA,DISTANCIA</variables><documento> <PERIODO>"202003"</PERIODO> <CONFIGURACION>"3S3"</CONFIGURACION> <ORIGEN>11001000</ORIGEN> <DESTINO>5001000</DESTINO> <NOMBREUNIDADTRANSPORTE>"ESTACAS"</NOMBREUNIDADTRANSPORTE> <NOMBRETIPOCARGA>"General"</NOMBRETIPOCARGA></documento></root>';

    (<any>this.client).AtenderMensajeBPM(body).subscribe((res: ISoapMethodResponse) => this.message = res);
  }

};

