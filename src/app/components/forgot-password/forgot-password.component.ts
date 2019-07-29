import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  correo: FormGroup;
  serverErrorMessages: string;
  isEmailSent: boolean = false;
  email = "";
  isLoading: Boolean = false;
  submitted = false;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.correo = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]]
    });
    this.onChanges();
  }

  public onEmailChange() {
    this.serverErrorMessages = "";
  }

  tryAgain() {
    this.isEmailSent = false;
    this.correo.reset();
    this.submitted = false;
  }

  onChanges(): void {
    this.correo.get('email').valueChanges.subscribe(val => {
      this.serverErrorMessages = "";
    });
  }

  public sendEmail() {
    this.submitted = true;
    this.isLoading = true;
    if(this.correo.valid) {
      this.userService.forgotPassword(this.correo.value).subscribe(
        res => {
          if(res['isError']) {
            this.serverErrorMessages = res['message'];
            this.isLoading = false;
          } else {
            this.isEmailSent = true;
      
            this.isLoading = false;
          }
        },
        err => {
          this.isLoading = false;
          this.serverErrorMessages = err['message'];;
        }
      );
    } else {
      this.isLoading = false;
    }
    
  }

}
