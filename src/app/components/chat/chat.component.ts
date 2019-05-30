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
  chats: any[] = [];
  elemento: any;
  displayName: String;

  userDetails: any;
  requestDetails: any;

  constructor(private userService: UserService, public _cs: ChatService, private actRoute: ActivatedRoute, private requestService: RequestService) {
    const requestId = this.actRoute.snapshot.paramMap.get('id');
    this._cs.cargarMensajes(requestId).subscribe(() => {

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20)
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
       this.mensaje = '';
    })

    .catch((err) => {
      console.log('error al enviar' + err)
    })
  }

}
