import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatService } from '../../service/chat.service';
import { ActivatedRoute } from "@angular/router";
import { RequestService } from '../../service/request.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  mensaje: string = "";
  elemento: any;
  displayName: String;
  chats: any[] = [];
  id: any;
  userDetails: any;
  requestDetails: any;
  selectedFeatures: any = [];

  constructor(private userService: UserService, public _cs: ChatService, private actRoute: ActivatedRoute, private requestService: RequestService) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.cargarMensajes(this.id);
  }

  public cargarMensajes(id) {
    this._cs.cargarMensajes(id).subscribe(() => {
    });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.getCurrentUser();
    this.getRequest(id);
  };


  public getCurrentUser() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.displayName = res['user'].name + ' ' + res['user'].lastName;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  public getRequest(id: any) {
    this.requestService.getRequest(id).subscribe(
      res => {
        this.requestDetails = res['request'];
        console.log(res['request']);
      },
      err => {
        console.log(err);
      }
    );
  }

  public enviar_mensaje() {
    if(this.mensaje.length == 0) {
      return;
    }
     this. _cs.agregarMensaje(this.mensaje)
     .then(() => {
      let datosContacto = {
        correoComercial: this.requestDetails.operadorId.email,
        nombreComercial: this.requestDetails.operadorId.name,
        apellidoComercial: this.requestDetails.operadorId.lastName,
        celularComercial: this.requestDetails.operadorId.cellPhone,
        correoCliente: this.requestDetails.usuario.email,
        nombreCliente: this.requestDetails.usuario.name,
        apellidoCliente: this.requestDetails.usuario.lastName,
        celularCliente: this.requestDetails.usuario.cellPhone,
        role: this.userDetails.role
     }
     this.selectedFeatures.push(datosContacto);
     console.log('Estos son los datos de los correos');
     console.log(this.selectedFeatures);
     
       this. _cs.enviarMensajeCorreo(this.mensaje, this.selectedFeatures);
       this.mensaje = '';
    })

    .catch((err) => {
      console.log('error al enviar' + err)
    })
  }

}
