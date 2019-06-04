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

  constructor(private userService: UserService,
    private router: Router, 
    private formBuilder: FormBuilder,
    public ws: WebsocketService) {

   }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email: [''.toLowerCase(), Validators.required],
      password: ['', Validators.required],
    });
  }

  public login() {
    this.userService.login(this.credentials.value).subscribe(
      res => {
        if(res['user'].role == 'ADMIN') {
          this.userService.setToken(res['token']);
          this.router.navigateByUrl('/dashboard/admin');
        } else {
          this.userService.setToken(res['token']);
          this.router.navigateByUrl('/dashboard');
        }

      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
}
