import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../../service/request.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ChatService } from '../../../../service/chat.service';
import { WebsocketService } from '../../../../service/websocket.service'

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html'
})
export class AdminRequestViewComponent implements OnInit {
  requestDetails: any;
  fakeStatus =  'Recibido';
  mensaje: string = "";

  constructor(private wsService: WebsocketService, public _cs: ChatService, private requestService: RequestService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.getRequest(id);
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

  public updateRequest(id: any, status) {
    this.requestService.updateStatus(id, status).subscribe(
      res => {
        console.log('REQUEST ACTUALIZADO' + res['request']);
      },
      err => {
        console.log(err);
      }
    );
  }

  // *TODO* Enviar mensaje al CHAT y ACTUALIZAR request
  public aceptarSolicitud(idUsuario: any) {
    console.log(idUsuario)
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.requestService.updateStatus(id, { status: "en progreso"}).subscribe(

      res => {
        let payload = {
           receiver: idUsuario,
           message: 'ha cambiado pues tu solicitud en proceso',
        }
        this.wsService.emit('notifications', payload)

        console.log('REQUEST ACTUALIZADO' + res['request']);
        this. _cs.agregarChatMensaje(this.mensaje, id)
          .then(() => {
            this.mensaje = '';
            this.router.navigate(['/dashboard/admin']);
          })
          .catch((err) => {
             console.log('error al enviar mensaje' + err)
          })
      },
      err => {
        console.log('ERROR ACEPTANDO SOLICITUD' + err);
      }
    );
  }

}
