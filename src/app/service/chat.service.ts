import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<any>;
  public chats: Mensaje[] = [];
  userDetails: any = {};
  private currentCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private userService: UserService ) {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarMensajes(id: any) {
    this.itemsCollection = this.afs.collection<any>(`chats/${id}/mensajes`, ref => ref.orderBy('fecha', 'desc').limit(50));
    return this.itemsCollection.valueChanges().pipe(
      map((mensajes) => {
        console.log(mensajes)
        this.chats = []

        for(let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }

      }))
   }

   agregarMensaje(texto: string) {
     // Falta el ID del usuario
    let mensaje: Mensaje = {
       nombre: this.userDetails.name,
       mensaje: texto,
       fecha: Date.now(),
       uid: this.userDetails._id
     }
     return this.itemsCollection.add(mensaje)
   }

   agregarChatMensaje(texto: string, id: any) {
    this.currentCollection = this.afs.collection<any>(`chats/${id}/mensajes`);
    // Falta el ID del usuario
    let mensaje: Mensaje = {
      nombre: this.userDetails.name,
      mensaje: texto,
      fecha: Date.now(),
      uid: this.userDetails._id
    }
    return this.currentCollection.add(mensaje)
  }
}
