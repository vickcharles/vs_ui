import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';
import { RequestService } from '../service/request.service';
import { UserService } from './user.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<any>;
  public chats: Mensaje[] = [];
  userDetails: any = {};
  private currentCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private userService: UserService, private requestService: RequestService ) {
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
    return this.itemsCollection.snapshotChanges().pipe(
      map((mensajes) => {
        this.chats = []
        mensajes.forEach((catData: any) => {
          this.chats.unshift(catData.payload.doc.data());
        });
        console.log(this.chats)
      }));
   }

   agregarMensaje(texto: string) {
     // Falta el ID del usuario
     var hours = new Date().getHours()
     var ampm = hours >= 12 ? 'pm' : 'am';
    let mensaje: Mensaje = {
       nombre: this.userDetails.name,
       mensaje: texto,
       fecha: Date.now(),
       hora: new Date().getHours() + ':' + new Date().getMinutes() + ' ' + ampm ,
       uid: this.userDetails._id
    }
     return this.itemsCollection.add(mensaje)
   }

   enviarMensajeCorreo(texto: string, datos) {
    // Falta el ID del usuario
    var hours = new Date().getHours()
    var ampm = hours >= 12 ? 'pm' : 'am';
    let mensaje = {
      nombre: this.userDetails.name,
      mensaje: texto,
      fecha: Date.now(),
      hora: new Date().getHours() + ':' + new Date().getMinutes() + ' ' + ampm ,
      uid: this.userDetails._id,
      correos: datos[0]
    }
    const cantidad_chats = this.chats.length;
    console.log('cantidad de chats', cantidad_chats);
    if (cantidad_chats >= 2){
      const chatAnterior = new Date (this.chats[cantidad_chats-1].fecha);
      const chatNuevo = new Date (this.chats[cantidad_chats-2].fecha);
      const diferencia = moment(chatAnterior).diff(chatNuevo);
      
      if (diferencia > 3600000) {
        this.correoMensajeNuevo(mensaje, datos);
      }
      
    }else{
      this.correoMensajeNuevo(mensaje, datos);
    }

  }

  correoMensajeNuevo(mensaje, datos){
    if (datos[0].role == 'User') {
      this.requestService.sendMailMessage(mensaje).subscribe(
        res => {
        },
        err => {
          console.log(err);
        }
      );
      
    }else{
      this.requestService.sendMailMessageClient(mensaje).subscribe(
        res => {
        },
        err => {
          console.log(err);
        }
      );

    }

  }

   agregarChatMensaje(texto: string, id: any) {
    this.currentCollection = this.afs.collection<any>(`chats/${id}/mensajes`);
    // Falta el ID del usuario
    let mensaje: Mensaje = {
      nombre: this.userDetails.name,
      mensaje: texto,
      fecha: Date.now(),
      hora: new Date().getHours() + ':' + new Date().getMinutes(),
      uid: this.userDetails._id,

    }
    return this.currentCollection.add(mensaje)
  }
}
