import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../../service/request.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ChatService } from '../../../../service/chat.service';
import { WebsocketService } from '../../../../service/websocket.service'
import { UserService } from '../../../../service/user.service';
import * as moment from 'moment';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.css']
})
export class AdminRequestViewComponent implements OnInit {
  requestDetails: any;
  fakeStatus =  'Recibido';
  mensaje: string = "";
  UserId: any;
  isLoading  = false;
  message: any;
  generalStatus: any;
  carga2 = false;
  carga3 = false;
  carga4 = false;
  initialTime_1;
  initialTime_2;
  initialTime_3;
  initialTime_4;
  finalTime_1;
  finalTime_2;
  finalTime_3;
  finalTime_4;
  time;
  time2;
  time3;
  time4;


  constructor(private wsService: WebsocketService,
    //public toastr: ToastrService,
    public _cs: ChatService,
    private requestService: RequestService,
    private actRoute: ActivatedRoute,
    private us: UserService,
    private router: Router
    ) {

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
        console.log('DATOS REQUEST');
        console.log(this.requestDetails);
        this.message = this.requestDetails.mensaje;
        this.generalStatus =  this.requestDetails.status;
        //this.finalTime_1 = moment(this.requestDetails.status.firstStep.finalDate).calendar();
        //this.finalTime_1 = moment(this.requestDetails.status.secondStep.finalDate).calendar();
        //this.finalTime_1 = moment(this.requestDetails.status.tercerPaso.finalDate).calendar();
        console.log('mensaje del request');
        console.log(this.message);
      },
      err => {
        console.log(err);
      }
    );
  }

  public updateRequest(id: any, status) {
    this.requestService.updateStatus(id, status).subscribe(
      res => {
        this.router.navigate(['/dashboard/admin']);
      },
      err => {
        console.log(err);
      }
    );
  }


  public cancelarSolicitud(idUsuario) {
    const RID = this.actRoute.snapshot.paramMap.get('id');
    console.log('cancelar, datos: ', RID);
    /*this.requestService.updateStatus(RID, { status: "cancelada"}).subscribe(
      res => {
        let payload = {
          userId: this.UserId,
          receiver: idUsuario,
          message: 'ha cancelado tu solicitud',
        };

        this.wsService.emit('notifications', payload)
        this.router.navigate(['/dashboard/admin']);
      },
      err => {
        console.log(err);
      }
    );*/
  }

  public solicitudCompletada(idUsuario) {
    const RID = this.actRoute.snapshot.paramMap.get('id');
    this.requestService.updateStatus(RID, { status: "completada"}).subscribe(
      res => {
        let payload = {
          userId: this.UserId,
          receiver: idUsuario,
          message: 'ha puesto tu solicitud como completada',
        }

        this.wsService.emit('notifications', payload)

        this.router.navigate(['/dashboard/admin']);
      },
      err => {
        console.log(err);
      }
    );
  }

  //METODOS PARA ACEPTAR SOLICITUDES NUEVAS
  public aceptarSolicitud(idUsuario: any) {
    this.isLoading = true;

    const id = this.actRoute.snapshot.paramMap.get('id');
    this.requestService.updateStatus(id, { status: "en proceso"}).subscribe(

      res => {
        let payload = {
          userId: this.UserId,
          receiver: idUsuario,
          message: 'ha puesto tu solicitud en proceso',
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

  estado(id, status) {
    const RID = this.actRoute.snapshot.paramMap.get('id');
    if (status === 2) {
        if (!this.generalStatus.secondStep.finalDate) {
        this.carga2 = true;
          this.requestService.updateTrafficStatus(RID, '5e543790085538000460ab84' ).subscribe((res: any) => {
          this.generalStatus =  res.lead.status;
          this.initialTime_2 =  moment(this.time2).locale('es').fromNow();
          const final = moment(res.lead.status.firstStep.finalDate).format('L');
          this.finalTime_1 = final;
          this.carga2 = false;
          // this.toastr.success('Fase terminada', 'Contacto Establecido 📞', {
          //   progressBar: true
          // });
        });
      }
      return;
    }
      if (status === 3) {
        if (this.generalStatus.secondStep.status === true) {
          if (!this.generalStatus.tercerPaso.finalDate) {
            this.carga3 = true;
              this.requestService.updateTrafficStatus( RID, '5e54379c085538000460ab85' ).subscribe ( (res: any) => {
              this.generalStatus =  res.lead.status;
              this.initialTime_3 =  moment(this.time3).locale('es').fromNow();
              const final = moment(res.lead.status.secondStep.finalDate).format('L');
              this.finalTime_2 = final;
              this.carga3 = false;
              // this.toastr.success('Fase terminada', 'Propuesta Realizada 📝', {
              //   progressBar: true
              // });
            });
          }
        }
        return ;
      }
      if (status === 4) {
        if (this.generalStatus.tercerPaso.status === true) {
          if (!this.generalStatus.fourthStep.finalDate) {
          this.carga4 = true;
          this.requestService.updateTrafficStatus( RID, '5e5437a8085538000460ab86' ).subscribe ( (res: any) => {
            this.carga4 = false;
            this.generalStatus =  res.lead.status;
            this.initialTime_4 =  moment(this.time3).locale('es').fromNow();
            const final = moment(res.lead.status.tercerPaso.finalDate).format('L');
            this.finalTime_3 = final;
            this.finalTime_4 = final;
            this.carga4 = false;
            //this.sound.play();
            // this.toastr.success('Fase terminada', 'Negociación Terminada 💵 💵 💵 !! ' , {
            //   progressBar: true
            // });
          });
        }
      }
    }
  }
}
