import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

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
}
