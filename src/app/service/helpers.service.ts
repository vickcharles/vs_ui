import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { get } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(
  ) { }

  /**
 * Display toastr error
 * @param error Custom Error Object
 * @param toastrOptions Overwrite default toastr options
 */

  /**
  * Show warning toastr
  * @param message warning message
  * @param title  warning title
  * @param toastrOptions Overwrite default toastr options
  */

  /**
  * Show success toastr
  * @param message success message
  * @param title  success title
  * @param toastrOptions Overwrite default toastr options
  */

  /**
   * Get a langs regex to validate browser lang
   */

  /**
   * Generate query string for HTTP get requests
   * @param payload options
   */
  queryOptions(payload: any) {
    let params = "";
    const keys = Object.keys(payload);
    // concat all parameters
    keys.forEach(key => {
      if (!params.length) {
        params = `?${key}=${payload[key]}`;
      } else {
        params += `&${key}=${payload[key]}`;
      }
    });

    return params;
  }

  setFormError(form: FormGroup, valid?: Boolean) {
    const keys = Object.keys(form.controls);
    keys.forEach(key => {
      form.controls[key].markAsTouched();
      form.controls[key].setErrors({ valid: valid || false });
    });
  }


  parseData(data){
    console.log('datos convertir payload: ', data);

    const typeofService = {
      nombre: data.request.tipoDeServicio.nombre,
      especificamente: data.request.tipoDeServicio.especificamente,
    }

    const client = {
      tipo: data.request.cliente.tipo,
      tipoDocumento: data.request.cliente.tipoDocumento,
      documento: data.request.cliente.documento,
      nombreEmpresa: data.request.cliente.nombreEmpresa
    }

    const user = {
      nombre: data.user.nombre,
      apellido: data.user.apellido,
      telefono: data.user.telefono,
      celular: data.user.celular,
      ciudad: data.user.ciudad,
      correo: data.user.correo,
      contrasena: data.user.contrasena,
      autorizo: data.user.autorizo,
      contrasenaConfirmada: data.user.contrasenaConfirmada,
    }
    

    var newData = {
      dashboard: {},
      zoho: {}
    }

    newData.dashboard = {
      tipoDeServicio: typeofService,
      cliente: client,
      user: user,
      origen: data.request.origen,
      destino: data.request.destino,
      mensaje: data.request.mensaje,

    }

    //DATOS CONVERTIDOS EN FORMATO ADMITIDO EN ZOHO
    //TIPO DE SERVICIO
    let typeServiceZoho = "";
    if (data.request.tipoDeServicio.nombre == "transporte de carga"){
      typeServiceZoho = "Transporte de carga";
    }
    if (data.request.tipoDeServicio.nombre == "alquiler de montacarga"){
      typeServiceZoho = "Alquiler de montacarga";
    }
    if (data.request.tipoDeServicio.nombre == "alquiler de grúa"){
      typeServiceZoho = "Alquiler de grua";
    }
    if (data.request.tipoDeServicio.nombre == "operario de cargue y descargue"){
      typeServiceZoho = "Operario de cargue y descargue";
    }
    //TIPO DE SERVICIO ESPECIFICAMENTE
    let typeServiceSpecificallyZoho = "";

    const dataGetForm = [
      {id: "transporte de carga seca", name: "Transporte de carga seca"}, 
      {id: "transporte de contenedores", name: "Transporte de contenedores"}, 
      {id: "transporte refrigerado", name: "Transporte refrigerado"}, 
      {id: "transporte de carga extradimensionada", name: "Transporte de carga extradimensionadas"},
      {id: "gruá", name: "Grúa" },
      {id: "gruá telescopica", name: "Grúa telescópica" },
      {id: "gruá de gancho", name: "Grúa de gancho" },
      {id: "gruá autodescargable", name: "Grúa auto-descargable" },
      {id: "telehandler", name: "Telehandler" },
      {id: "ManLift", name: "ManLift" },
      {id: "1", name: "1" },
      {id: "2", name: "2" },
      {id: "3", name: "3" },
      {id: "4", name: "4" },
      {id: "5", name: "5" },
      {id: "6", name: "6" },
      {id: "7", name: "7" },
      {id: "8", name: "8" },
      {id: "9", name: "9" },
      {id: "10", name: "10" },
      {id: "11", name: "11" },
      {id: "12", name: "12" },
      {id: "13", name: "13" },
      {id: "14", name: "14" },
      {id: "15", name: "15" },
      {id: "16", name: "16" },
    ]

    const dataSendFormZoho = [
      {id: "Transporte de carga seca", name: "Transporte de carga seca"},
			{id: "Transporte de contenedores", name: "Transporte de contenedores"},
			{id: "Transporte refrigerado", name: "Transporte refrigerado"},
			{id: "Transporte de carga extradimensionada", name: "Transporte de carga extradimensionada"},
      {id: "Grúa PH", name: "Grúa PH"},
			{id: "Grúa Telescopica", name: "Grúa Telescopica"},
			{id: "Grúa de gancho", name: "Grúa de gancho"},
			{id: "Grúa auto-descargable", name: "Grúa auto-descargable"},
			{id: "Telehandler", name: "Telehandler"},
			{id: "ManLift", name: "ManLift"},
      {id: "1 tonelada", name: "1 tonelada"},
			{id: "2 toneladas", name: "2 toneladas"},
			{id: "3 toneladas", name: "3 toneladas"},
			{id: "4 toneladas", name: "4 toneladas"},
			{id: "5 toneladas", name: "5 toneladas"},
			{id: "6 toneladas", name: "6 toneladas"},
			{id: "7 toneladas", name: "7 toneladas"},
			{id: "8 toneladas", name: "8 toneladas"},
			{id: "9 toneladas", name: "9 toneladas"},
			{id: "10 toneladas", name: "10 toneladas"},
			{id: "11 toneladas", name: "11 toneladas"},
			{id: "12 toneladas", name: "12 toneladas"},
			{id: "13 toneladas", name: "13 toneladas"},
			{id: "14 toneladas", name: "14 toneladas"},
			{id: "15 toneladas", name: "15 toneladas"},
			{id: "16 toneladas", name: "16 toneladas"},
    ]

    for (let index = 0; index < dataGetForm.length; index++) {
      if (data.request.tipoDeServicio.especificamente == dataGetForm[index].id) {
        typeServiceSpecificallyZoho = dataSendFormZoho[index].id;
        console.log('Datos entrando a zoho especificamnete');
      }
    }

    //Tipo de cliente
    let typeClient = "";
    //Tipo de documneto
    let typeClientDocument = "";

    if (data.request.cliente.tipo == 'natural') {
      typeClient = 'Natural';
      typeClientDocument = 'Cédula Ciudadanía';
    } else if (data.request.cliente.tipo == 'empresa') {
      typeClient = 'Empresa';
      typeClientDocument = 'Nit';
    }

    newData.zoho = {
      tipoDeServicio: typeServiceZoho,
      especificamente: typeServiceSpecificallyZoho,
      cliente_tipo: typeClient,
      cliente_tipoDocumento: data.request.cliente.tipoDocumento || typeClientDocument,
      cliente_documento: data.request.cliente.documento,
      cliente_nombreEmpresa: data.request.cliente.nombreEmpresa,
      mensaje: data.request.mensaje,
      origen: data.request.origen,
      destino: data.request.destino,
      usuario_nombre: data.user.nombre,
      usuario_apellido: data.user.apellido,
      usuario_telefono: data.user.telefono,
      usuario_celular: data.user.celular,
      usuario_ciudad: data.user.ciudad,
      usuario_correo: data.user.correo,
      //usuario_digito: data.user.digito,
    }


    Object.keys(newData.zoho).forEach(key => newData.zoho[key] === undefined && delete newData.zoho[key])


    console.log('newData: ', newData);


    return newData;

  }

}