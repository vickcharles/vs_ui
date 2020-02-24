
import { RequestService } from '../../../service/request.service';
import { WebsocketService } from '../../../service/websocket.service';
import {Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html'
})
export class RequestListComponent implements OnInit {

  @ViewChild(MatTabGroup, {static: false}) tabGroup: MatTabGroup;
  requests: any;
  requestsHistorial: any;
  requestsOnProgress: any;
  numeroDeHistorials: any;
  requestsRecibidos: any;

  UserId: any;
  filter: string;
  fechaInicio: any;
  fechaFinal: any;
  pdf = 'false';
  excel = 'false';
  cargaReporte1 = true;
  cargaReporte2 = true;
  
  constructor(private requestService: RequestService,
    private wsService: WebsocketService) {
      this.getAllHistorial();
    }

  ngOnInit() {
    this.getAllRequest();
    this.getAllRequestOnProgress();

    this.wsService.listen('new-notifications')
      .subscribe((res: any) => {
          this.getAllRequest();
          this.getAllHistorial();
          this.getAllRequestOnProgress();
      });
  }


  public getAllRequestOnProgress() {
    this.requestService.getRequests().subscribe(
      res => {
        this.requestsOnProgress = res['requests'];
        console.log(res['requests']);
        this.requestsOnProgress = this.requestsOnProgress.filter((e) => e.estado === 'en proceso');
        console.log(this.requestsOnProgress);
      },
      err => {
        console.log(err);
      }
    );
  }

  public getAllHistorial() {
    this.requestService.getRequests().subscribe(
      res => {
        this.requests = res['requests'];
        this.requests = this.requests.filter((e) => e.estado == 'completada' ||  e.estado == 'cancelada');
        this.requestsHistorial = this.requests;
        this.numeroDeHistorials = this.requests.length;
      },
      err => {
        console.log(err);
      }
    );
  }

  showPueblo(event):void {
    this.numeroDeHistorials = event.numero;
  }

  public getAllRequest() {
    this.requestService.getRequests().subscribe(
      res => {
        this.requests = res['requests'];
        this.requests = this.requests.filter((e) => e.estado === 'recibido');
        this.requestsRecibidos = this.requests;
        console.log(res['requests']);
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarLeads(){
    this.cargaReporte2 = false;

    if(this.tabGroup.selectedIndex==0 && this.requestsRecibidos.length!=0){
      this.requestService.exportAsExcelFileRequestUser(this.requestsRecibidos, '24/7_recibidos');
    }
    
    if(this.tabGroup.selectedIndex==1 && this.requestsOnProgress.length!=0){
      this.requestService.exportAsExcelFileRequestUser(this.requestsOnProgress, '24/7_pendientes');
    }
    
    if(this.tabGroup.selectedIndex==2 && this.requestsHistorial.length!=0){
      this.requestService.exportAsExcelFileRequestUser(this.requestsHistorial, '24/7_historial');
    }
    
    
    this.cargaReporte2 = true;
  }
}
