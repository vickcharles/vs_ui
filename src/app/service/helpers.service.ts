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
    let params = '';
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

    newData.zoho = {
      tipoDeServicio: data.request.tipoDeServicio.nombre,
      especificamente: data.request.tipoDeServicio.especificamente,
      cliente_tipo: data.request.cliente.tipo,
      cliente_tipoDocumento: data.request.cliente.tipoDocumento,
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
