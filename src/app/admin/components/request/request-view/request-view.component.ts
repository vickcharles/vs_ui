import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../../service/request.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ChatService } from '../../../../service/chat.service';
import { WebsocketService } from '../../../../service/websocket.service'
import { UserService } from '../../../../service/user.service';
import * as moment from 'moment';
import { RechazoModalComponent } from '../request-modals/rechazo-modal/rechazo-modal.component';
import { PerdidaOportunidadModalComponent } from '../request-modals/perdida-oportunidad.modal/perdida-oportunidad-modal.component';
import { NoAceptadoModalComponent } from '../request-modals/no-aceptado-modal/no-aceptado-modal.component';
import { MatDialog } from '@angular/material';
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
  status_1_days: number;
  status_2_days: number;
  status_3_days: number;
  dataClient: any;
  id_lead: any;
  payload: { userId: any; receiver: any; message: string; };

  constructor(private wsService: WebsocketService,
    //public toastr: ToastrService,
    public _cs: ChatService,
    private requestService: RequestService,
    private actRoute: ActivatedRoute,
    private us: UserService,
    private router: Router,
    private dialog: MatDialog
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
    this.actRoute.params.subscribe((resp: any) => {
      this.id_lead = resp.id;
        this.requestService.getRequest(resp.id).subscribe( (res: any) => {
          this.message = res.request.mensaje;
          this.requestDetails = res['request'];
          this.finalTime_1 = moment(res.request.status.firstStep.finalDate).locale('es').calendar();
          this.finalTime_2 = moment(res.request.status.secondStep.finalDate).locale('es').calendar();
          this.finalTime_3 = moment(res.request.status.thirdStep.finalDate).locale('es').calendar();
          if (res.request.status.fourthStep.status) {
            this.finalTime_4 = moment(res.request.status.thirdStep.finalDate).calendar();
          }
          this.generalStatus =  res['request'].status;
          this.dataClient = res.request.usuario;
          this.time = moment(res.request.status.firstStep.initialDate);
          this.time2 = moment(res.request.status.secondStep.initialDate);
          this.time3 = moment(res.request.status.thirdStep.initialDate);
          var a1 = moment(this.requestDetails.created_at);
            var b1 = moment(res.request.status.firstStep.finalDate);
            this.status_1_days = b1.diff(a1, 'days');
          if (res.request.status.secondStep.status === true) {
            this.initialTime_2 =  moment(this.time2).locale('es').fromNow();
            var a2 = moment(res.request.status.secondStep.finalDate);
            var b2 = moment(res.request.status.thirdStep.initialDate);
            this.status_2_days = b2.diff(a2, 'days');
          }
          if (res.request.status.thirdStep.status === true) {
            this.initialTime_3 =  moment(this.time3).locale('es').fromNow();
            var a3 = moment(res.request.status.thirdStep.initialDate);
            var b3 = moment(res.request.status.fourthStep.finalDate);
            this.status_3_days = b3.diff(a3, 'days');
          }



        });
    });
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


  rejectRequest(idUsuario) {
    this.payload = {
      userId: this.UserId,
      receiver: idUsuario,
      message: 'ha cancelado tu solicitud',
    };
    this.abrirModalRechazoLead();
  }

  missedOpportunityRequest(idUsuario) {
    this.payload = {
      userId: this.UserId,
      receiver: idUsuario,
      message: 'ha cancelado tu solicitud',
    };
    this.abrirModalOportunidad();
  }

  requestNotAccepted(idUsuario) {
    this.payload = {
      userId: this.UserId,
      receiver: idUsuario,
      message: 'ha cancelado tu solicitud',
    };
    this.abrirModalNoAceptado();
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

  statusChange(statusSend) {
    if (statusSend === 2) {
      console.log('estado de la request: ', this.requestDetails.estado);
      if (this.generalStatus.secondStep.status !== true && this.requestDetails.estado === 'en proceso') {
        if (!this.generalStatus.secondStep.finalDate) {
        this.requestService.updateTrafficStatus( this.id_lead, '5e543790085538000460ab84' ).subscribe ( (res: any) => {
          this.generalStatus =  res.requestGuardado.status;
          this.initialTime_2 =  moment(this.time2).locale('es').fromNow();
          const final = moment(res.requestGuardado.status.firstStep.finalDate).format('L');
          this.finalTime_1 = final;
        });
      }
      }
      return;
    }
    if (statusSend === 3) {
      if (this.generalStatus.secondStep.status === true && this.generalStatus.thirdStep.status !== true) {
        if (!this.generalStatus.thirdStep.finalDate) {
          this.requestService.updateTrafficStatus( this.id_lead, '5e54379c085538000460ab85' ).subscribe ( (res: any) => {
            this.generalStatus =  res.requestGuardado.status;
            this.initialTime_3 =  moment(this.time3).locale('es').fromNow();
            const final = moment(res.requestGuardado.status.secondStep.finalDate).format('L');
            this.finalTime_2 = final;
          });
        }
      }
      return ;
    }
    if (statusSend === 4) {
      if (this.generalStatus.thirdStep.status === true && this.generalStatus.fourthStep.status !== true) {
        if (!this.generalStatus.fourthStep.finalDate) {
          this.requestService.updateTrafficStatus( this.id_lead, '5e5437a8085538000460ab86' ).subscribe ( (res: any) => {
          this.generalStatus =  res.requestGuardado.status;
          this.initialTime_4 =  moment(this.time3).locale('es').fromNow();
          const final = moment(res.requestGuardado.status.thirdStep.finalDate).format('L');
          this.finalTime_3 = final;
          this.finalTime_4 = final;
          this.solicitudCompletada(this.requestDetails.usuario._id)
        });
        }
      }
    }
  }

  abrirModalRechazoLead() {
    const dialogRef = this.dialog.open(RechazoModalComponent, {
      width: '800px',
      data: {id_lead: this.id_lead, payload: this.payload}
    });

     dialogRef.afterClosed().subscribe(result => {
      console.log('datos despues del rechazo', result);
    });
  }

  abrirModalOportunidad() {
    const dialogRef = this.dialog.open(PerdidaOportunidadModalComponent, {
      width: '800px',
      data: {id_lead: this.id_lead, payload: this.payload}
    });

  dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  abrirModalNoAceptado() {
    const dialogRef = this.dialog.open(NoAceptadoModalComponent, {
      width: '800px',
      data: {id_lead: this.id_lead}
    });

  dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }


}
