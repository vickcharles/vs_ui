import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  selectedUser = {
    role: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) {}

  //HttpMethods
  postUser(user: any){
    return this.http.post(environment.apiBaseUrl + '/register', user, this.noAuthHeader);
  }

  postUserAndRequest(data: any){
    return this.http.post(environment.apiBaseUrl + '/register/request', data, this.noAuthHeader);
  }


  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  forgotPassword(email) {
    return this.http.post(environment.apiBaseUrl + '/forgotPassword', { email: email.email});
  }

 /*Verificar token para reseter contraseña*/
  verifyToken(token) {
    const params = new HttpParams()
    .set('resetPasswordToken', token)
    return this.http.get(environment.apiBaseUrl + '/reset', { params});
  }


  resetPassword(data) {
    return this.http.post(environment.apiBaseUrl + '/updatePassword', data);
  }

  updateUser(user) {
    return this.http.post(environment.apiBaseUrl + '/user/update', user);
  }

  //Helper Methods
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('Client');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
