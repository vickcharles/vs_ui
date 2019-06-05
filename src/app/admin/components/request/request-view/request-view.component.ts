import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../../service/request.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ChatService } from '../../../../service/chat.service';
import { WebsocketService } from '../../../../service/websocket.service'
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html'
})
export class AdminRequestViewComponent implements OnInit {
  requestDetails: any;
  fakeStatus =  'Recibido';
  mensaje: string = "";
  UserId: any;
  isLoading  = false;

  constructor(private wsService: WebsocketService,
    public _cs: ChatService,
    private requestService: RequestService,
    private actRoute: ActivatedRoute,
    private us: UserService,
    private router: Router) {

      this.us.getUserProfile().subscribe(
        res => {
          this.UserId = res['user']._id;
        },
        err => {
          console.log(err);
        }
      );
    }

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

  public aceptarSolicitud(idUsuario: any) {
    this.isLoading = true;
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.requestService.updateStatus(id, { status: "en progreso"}).subscribe(

      res => {

        let payload = {
          userId: this.UserId,
          receiver: idUsuario,
          message: 'ha cambiado pues tu solicitud en proceso',
        }

        this.wsService.emit('notifications', payload)

        this. _cs.agregarChatMensaje(this.mensaje, id)
          .then(() => {
            this.isLoading = false;
            this.mensaje = '';
            this.router.navigate(['/dashboard/admin']);
          })
          .catch((err) => {
            this.isLoading = false;
             console.log('error al enviar mensaje' + err)
          })
      },
      err => {
        this.isLoading = false;
        console.log('ERROR ACEPTANDO SOLICITUD' + err);
      }
    );
  }

}
