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

  getRequest(id) {
    return this.http.get(environment.apiBaseUrl + '/request/getById/' + id);
  }
}
