import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import superagent from "superagent";

@Injectable({
  providedIn: 'root'
})

export class RequestService {

  constructor(private http: HttpClient) { }

  //HttpMethods
  postRequest(request: any){
    return this.http.post(environment.apiBaseUrl + '/request/create', request);
  }

  getRequests() {
    return this.http.get(environment.apiBaseUrl + '/request/getAll');
  }

  getHistorial() {
    return this.http.get(environment.apiBaseUrl + '/request/historial');
  }

  getAdminRequests() {
    return this.http.get(environment.apiBaseUrl + '/request/getAllAdmin');
  }

  getRequest(id) {
    return this.http.get(environment.apiBaseUrl + '/request/getById/' + id);
  }

  updateStatus(id, status) {
    return this.http.put(environment.apiBaseUrl + `/request/update/status/${id}`, status);
  }

  sendSMSendEmail(saverequest) {
    console.log('para envair')
    console.log(saverequest);

    const data = {
      "email": saverequest.usuario.email,
      "eventName": "nueva_solicitud",
      "attributes": {
        "nombre": saverequest.usuario.name,
        "celular": saverequest.usuario.cellPhone,
        "nombreComercial":  saverequest.operadorId.name,
        "apellidoComercial": saverequest.operadorId.lastName,
        "correoComercial": saverequest.operadorId.email,
        "telefonoComercial": saverequest.operadorId.cellPhone
      }
    };

   return superagent.post('https://track.embluemail.com/contacts/event')
    .send(data)
    .set('Authorization', 'Basic NTQyODYzMTk4MjAwNGVlY2E1MWRkY2MyNjNmNmY1ODE=')
    .set('Content-Type', 'application/json')
  }
}

