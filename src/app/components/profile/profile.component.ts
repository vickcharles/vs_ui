import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isEditingPerfil: Boolean = false;
  constructor() { }

  ngOnInit() {
  }


  public toggleEditPerfil() {
    this.isEditingPerfil = !this.isEditingPerfil;
  }

}
