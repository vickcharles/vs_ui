import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isEditingPerfil: Boolean = false;
  userDetails: any;
  user: FormGroup;
  submitted = false;

  constructor(private snackBar: MatSnackBar, private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUser();
    this.user = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
      ciudad: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      correo: ['', [ Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      contrasena: [{value: 'NancyFake', disabled: true}, [Validators.required, Validators.minLength(6)]],
    });
  }

  public getUser() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.user.patchValue({
          nombre: this.userDetails.name,
          apellido: this.userDetails.lastName,
          telefono: this.userDetails.cellPhone,
          ciudad: this.userDetails.city ? this.userDetails.city : '',
          correo: this.userDetails.email
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  openSnackBar() {
    this.snackBar.open('Sus cambios han sido guardados', 'ok', {
      duration: 4000,
      horizontalPosition: 'left'
    });
  }

  public updatedUser() {
    this.submitted = true;
    if(this.user.valid) {
      this.userService.updateUser(this.user.value).subscribe(
        res => {
          this.openSnackBar();
          this.toggleEditPerfil();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  public toggleEditPerfil() {
    this.isEditingPerfil = !this.isEditingPerfil;
    this.getUser();
  }

}
