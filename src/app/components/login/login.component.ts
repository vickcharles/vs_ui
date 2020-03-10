import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from "@angular/router";
import { WebsocketService } from '../../service/websocket.service'
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  credentials: FormGroup;
  serverErrorMessages: String;
  isLoading: Boolean = false;

  constructor(private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login() {

    let value = this.credentials.get('email').value

    this.credentials.get('email').setValue(value.toLowerCase())


    this.isLoading = true;
    this.userService.login(this.credentials.value).subscribe(
      res => {
        if (res['user'].role == 'ADMIN' && res['user'].status == 'ACTIVO') {
          this.isLoading = false;
          this.userService.setToken(res['token']);
          
          this.router.navigateByUrl('/dashboard/admin');
        }
        if (res['user'].role == 'ADMIN' && res['user'].status == 'INACTIVO') { 
          this.isLoading = false;
          this.openSnackBarAdmin();}

        if(res['user'].role == 'User') {
          this.userService.setToken(res['token']);
          this.router.navigateByUrl('/dashboard');
        }
      },
      err => {
        this.isLoading = false;
        this.serverErrorMessages = err.error.message;
        setTimeout(() => {
          this.serverErrorMessages = '';
        },3000);
      }
    );
  }

  openSnackBarAdmin() {
    this.snackBar.open('No tiene permisos para ingresar', 'usuario INACTIVO', {
      duration: 5000,
      horizontalPosition: 'center'
    });
  }
}
