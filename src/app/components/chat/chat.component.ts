import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatService } from '../../service/chat.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  mensaje: string = "";
  chats: any[] = [];
  elemento: any;

  constructor(public _cs: ChatService, private actRoute: ActivatedRoute) {
    const requestId = this.actRoute.snapshot.paramMap.get('id');
    this._cs.cargarMensajes(requestId).subscribe((res: any) => {
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20)
        this.chats = [];
        for(let mensaje of res) {
          this.chats.unshift(mensaje)
        }
    })
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
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
