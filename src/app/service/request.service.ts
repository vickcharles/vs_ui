import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import superagent from "superagent";

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { map } from 'rxjs/operators';

export interface Causal {
  id_causal: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})

export class RequestService {
  push(arg0: import("@angular/forms").FormControl) {
    throw new Error("Method not implemented.");
  }

  

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

  updateTrafficStatus(id, status) {
    return this.http.put(environment.apiBaseUrl + `/request/update/trafficStatus/${id}`,{status:`${status}`});
  }

  getCausal() {
    return this.http.get(environment.apiBaseUrl + '/causal/getAll').pipe(
      map( (res: any) => {
        return res.causal;
      })
    );
  }

  addCausal(mensaje, id) {
    console.log('datos a cambiar en el api', mensaje);
    return this.http.put(environment.apiBaseUrl + `/request/update/causal/${id}`, mensaje);
  }

  sendMailMessage(mailMessage){
    //console.log('estos son los datos entra aqui' + mailMessage);
    return this.http.post(environment.apiBaseUrl + `/request/mail`, mailMessage);
  }

  sendMailMessageClient(mailMessage){
    //console.log('estos son los datos entra aqui' + mailMessage);
    return this.http.post(environment.apiBaseUrl + `/request/mail/client`, mailMessage);
  }

  sendSMSendEmail(saverequest) {
    console.log('para envair')
    console.log(saverequest);

    const data = {
      "email": saverequest.usuario.email,
      "eventName": "nueva_solicitud",
      "attributes": {
        "nombre": saverequest.usuario.name,
        "celular": `+57${saverequest.usuario.cellPhone}`,
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

  public exportAsExcelFileRequest(json: any[], excelFileName: string): void {

    let externalData = [];
                for (let i = 0; i < json.length; i++) {
                    externalData.push({
                        Estado: json[i].estado,
                        Tipo_cliente: json[i].cliente.tipo,
                        Nombre: json[i].usuario.name,
                        Apellido: json[i].usuario.lastName,
                        Correo: json[i].usuario.email,
                        Celular: json[i].usuario.cellPhone,
                        Ciudad: json[i].usuario.city,
                        Fecha_solicitud: json[i].created_at,
                        Tipo_de_servicio: json[i].tipoDeServicio.nombre,
                        Especificamente: json[i].tipoDeServicio.especificamente,
                        Mensaje: json[i].mensaje,
                    });
                }
    this.exportAsExcelFile(externalData,excelFileName);
    
  }

  public exportAsExcelFileRequestUser(json: any[], excelFileName: string): void {

    let externalData = [];
                for (let i = 0; i < json.length; i++) {
                    externalData.push({
                        Estado: json[i].estado,
                        Nombre_operador: json[i].operadorId.name,
                        Apellido_operador: json[i].operadorId.lastName,
                        Correo_operador: json[i].operadorId.email,
                        Celular_operador: json[i].operadorId.cellPhone,
                        Ciudad_operador: json[i].operadorId.city,
                        Fecha_solicitud: json[i].created_at,
                        Origen: json[i].origen,
                        Tipo_de_servicio: json[i].tipoDeServicio.nombre,
                        Especificamente: json[i].tipoDeServicio.especificamente,
                        Mensaje: json[i].mensaje,
                    });
                }
    this.exportAsExcelFile(externalData,excelFileName);
    
  }

  public exportAsExcelFile(externalData: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(externalData);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array'});
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }

}

