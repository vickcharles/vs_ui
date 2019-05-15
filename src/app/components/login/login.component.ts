import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: FormGroup;
  serverErrorMessages: String;

  constructor(private userService: UserService,private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email: [''.toLowerCase(), Validators.required],
      password: ['', Validators.required],
    });
  }

  public login() {
    this.userService.login(this.credentials.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
}
