import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from "@angular/router";

import { MustMatch } from '../../validators/password-match';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password: FormGroup;
  submitted = false;
  token = "";
  isUserToken = false;
  isLoading = false;
  isPasswordReset = false;

  userId = "";
  serverMessageError = "";

  constructor(private userService: UserService,
    private actRoute: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    const token = this.actRoute.snapshot.paramMap.get('token');

    this.userService.verifyToken(token).subscribe(
      res => {
        if(res['isError']) {
          this.serverMessageError = res['message'];
          this.isUserToken = false;
        } else {
          this.isUserToken =  true;
          this.userId = res['id']
        }
      },
      err => {
        this.serverMessageError = "Oppps, Algo estuvo mal";
      }
    );
    this.password = this.formBuilder.group({
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      verificarContraseña: ['', Validators.required]
    },
    {
      validator: MustMatch('contraseña', 'verificarContraseña')
    });
  }

  resetPassword() {
    this.submitted = true;
    this.isLoading = true;
    if(this.password.valid) {
      const data = {
         userID: this.userId,
         password: this.password.get('contraseña').value
      }
      this.userService.resetPassword(data).subscribe(
        res => {
          if(res['isError']) {
            this.serverMessageError = res['message'];
            this.isLoading = false;
          } else {
            this.isPasswordReset = true;
            this.isLoading = false;
          }
        },
        err => {
          this.serverMessageError = "Oppps, Algo estuvo mal";
        }
      );
    }
  }

}
