import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(private http: HttpClient) {}

  //HttpMethods

  getAll(){
    return this.http.get(environment.apiBaseUrl + '/notification/getAll');
  };
}
