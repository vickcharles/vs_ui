import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../../service/request.service';

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
  requestCompleted: any[] = [];
  requestRecividos: any[] = [];
  AdminrequestOnProgress: any[] = [];

  constructor(private snackBar: MatSnackBar, 
    private userService: UserService, 
    private formBuilder: FormBuilder,
    private requestService: RequestService
  ) {
    this.getAllRequestPending();
    this.getAllRequestOnProgress();
  }

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


  public getAllRequestOnProgress() {
    this.requestService.getRequests().subscribe(
      res => {
        this.requestCompleted = res['requests'];
        console.log(res['requests'])
        this.requestCompleted = this.requestCompleted.filter((e) => e.estado === 'completada');
      },
      err => {
        console.log(err);
      }
    );
  }


  public getAllRequestPending() {
    this.requestService.getRequests().subscribe(
      res => {
        this.requestRecividos = res['requests'];
        this.requestRecividos = this.requestRecividos.filter((e) => e.estado === 'en proceso');
      },
      err => {
        console.log(err);
      }
    );
  }

  public getAllAdminRequestOnProgress() {
    this.requestService.getAdminRequests().subscribe(
      res => {
        this.AdminrequestOnProgress = res['requests'];
        this.AdminrequestOnProgress = this.AdminrequestOnProgress.filter((e) => e.estado === 'en proceso');
      },
      err => {
        console.log(err);
      }
    );
  }

  public getUser() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.user.patchValue({
          nombre: this.userDetails.name,
          apellido: this.userDetails.lastName,
          telefono: this.userDetails.cellPhone,
          ciudad: this.userDetails.city,
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
