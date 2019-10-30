import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from "@angular/router";
import { WebsocketService } from '../../service/websocket.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  credentials: FormGroup;
  serverErrorMessages: String;
  isLoading: Boolean = false;

  constructor(private userService: UserService,
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
        if(res['user'].role == 'ADMIN') {
          this.isLoading = false;
          this.userService.setToken(res['token']);
          this.router.navigateByUrl('/dashboard/admin');
        } else {
          this.userService.setToken(res['token']);
          this.router.navigateByUrl('/dashboard');
        }
      },
      err => {
        this.isLoading = false;
        this.serverErrorMessages = err.error.message;
      }
    );
  }
}
