import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  constructor(private socket: Socket) {
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor')
      this.socketStatus = false;
    })


    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor')
      this.socketStatus = true;
    })
  }

  public emit(evento: string, payload?: any, callback?: Function) {
   this.socket.emit(evento, payload, callback);
  }

  public listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

}
