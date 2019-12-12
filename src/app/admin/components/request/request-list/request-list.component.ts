import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService } from '../../../../service/request.service';
import { WebsocketService } from '../../../../service/websocket.service'
import { UserService } from '../../../../service/user.service';
import {saveAs} from 'file-saver';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { observable } from 'rxjs';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';


export interface UserData {
  cliente: {
    documento: string,
    nombreEmpresa: string,
    tipo: string,
    tipoDocumento: string,
  },
  created_at: string,
  destino: string,
  estado: string,
  mensaje: string,
  operadorId: string,
  origen: string,
  tipoDeServicio: {
    especificamente: string,
    nombre: string,
  },
  updated_at: string,
  usuario: {
    cellPhone: string,
    city: string,
    createdAt: string,
    email: string,
    lastName: string,
    name: string,
    password: string,
    role: string,
    saltSecret: string,
    updatedAt: string,
    _id: string,
  },
  _id: string,
  }


@Component({
  selector: 'app-admin-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class AdminRequestListComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'celular', 'correo', 'modalidad', 'ciudad'];
  requests: any;
  requestOnProgress: any;
  onProgress = true;
  UserId: any;
  filter: string;
  fechaInicio: any;
  fechaFinal: any;
  pdf = 'false';
  excel = 'false';
  cargaReporte1 = true;
  cargaReporte2 = true;


  inicio: any = null;
  fin: any = null;
  inicioPersonalizada: any = null;
  finPersonalizada: any = null;
  mesInicio: any;
  mesFin: any ;
  totalGeneral: number;
  editable = false;
  locale = 'es';
  placeholder = 'Selecciona una fecha';
  date = new Date();

  
  public startDate: IMyDpOptions = {
    dateFormat: 'mm-dd-yyyy',
    editableDateField: false
  };

  public endDate: IMyDpOptions = {
    dateFormat: 'mm-dd-yyyy',
    disableUntil: { year: 0, month: 0, day: 0 },

  };


  

  constructor(
    private requestService: RequestService,
    private us: UserService,
    private wsService: WebsocketService ) {
    this.getUserDetails();
  }

  onStartDateChanged(event: IMyDateModel) {
    
    const d: Date = new Date(event.jsdate.getTime());

    // set previous of selected date
    d.setDate(d.getDate() - 1);

    // Get new copy of options in order the date picker detect change
    const copy: IMyDpOptions = this.getCopyOfEndDateOptions();
    copy.disableUntil = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
    this.endDate = copy;
  }

  onEndDateChanged(event: IMyDateModel) {
    // end date changed...
  }

  getCopyOfEndDateOptions(): IMyDpOptions {
    return JSON.parse(JSON.stringify(this.endDate));
  }


  ngOnInit() {
    this.getAllAdminRequest(this.filter, this.fechaInicio, this.fechaFinal)
    this.getAllAdminRequestOnProgress(this.filter, this.fechaInicio, this.fechaFinal)


    this.wsService.listen('new-notifications')
      .subscribe((res: any) => {
        if(res.receiver == this.UserId) {
          this.getAllAdminRequest(this.filter, this.fechaInicio, this.fechaFinal);
        }
      });
  }

  getUserDetails() {
    this.us.getUserProfile().subscribe(
      res => {
        this.UserId = res['user']._id;
      },
      err => {
        console.log(err);
      }
    )
  }

  public getAllAdminRequest(filterValue, fechaInicio, fechaFinal, fechaPersonalizada?) {
    this.requestService.getAdminRequests().subscribe(
      res => {
        this.requests = res['requests'];
        this.requests = this.requests.filter((e) => e.estado === 'recibido');
        if (filterValue){
          this.requests = this.requests.filter((e) => e.usuario.name.toLowerCase().indexOf(filterValue.toLowerCase())!==-1);
        }
        if (fechaInicio){
          fechaInicio = moment().format('YYYY-MM-DDT00:00:00.000Z');
          this.requests = this.requests.filter((e) => e.created_at >= fechaInicio);
        }
        if (fechaFinal){
          this.fin = moment().format('YYYY-MM-DDT23:59:59.999Z');
          this.inicio = moment().startOf('month').format('YYYY-MM-DDT00:00:00.000Z');
          //console.log('fecha fin: '+this.fin);
          //console.log('fecha inicio: '+this.inicio);
          this.requests = this.requests.filter((e) => e.created_at >= this.inicio);
          this.requests = this.requests.filter((e) => e.created_at <= this.fin);
        }
        if (fechaPersonalizada){
          this.requests = this.requests.filter((e) => e.created_at >= this.inicioPersonalizada);
          this.requests = this.requests.filter((e) => e.created_at <= this.finPersonalizada);
        }
        console.log(res['requests']);
      },
      err => {
        console.log(err);
      }
    );
  }

  public toggleMenuPending() {
    this.onProgress = false;
  }

  public toggleMenuOnProgress() {
    this.onProgress = true;
  }

  public getAllAdminRequestOnProgress(filterValue, fechaInicio, fechaFinal, fechaPersonalizada?) {
    this.requestService.getAdminRequests().subscribe(
      res => {
        this.requestOnProgress = res['requests'];
        this.requestOnProgress = this.requestOnProgress.filter((e) => e.estado === 'en proceso');
        if (filterValue){
          this.requestOnProgress = this.requestOnProgress.filter((e) => e.usuario.name.toLowerCase().indexOf(filterValue.toLowerCase())!==-1);
        }
        if (fechaInicio){
          fechaInicio = moment().format('YYYY-MM-DDT00:00:00.000Z');
          this.requestOnProgress = this.requestOnProgress.filter((e) => e.created_at >= fechaInicio);
          console.log('FECHA CANCELADOS: '+fechaInicio);
        }
        if (fechaFinal){
          this.fin = moment().format('YYYY-MM-DDT23:59:59.999Z');
          this.inicio = moment().startOf('month').format('YYYY-MM-DDT00:00:00.000Z');
          //console.log('fecha fin: '+this.fin);
          //console.log('fecha inicio: '+this.inicio);
          this.requestOnProgress = this.requestOnProgress.filter((e) => e.created_at >= this.inicio);
          this.requestOnProgress = this.requestOnProgress.filter((e) => e.created_at <= this.fin);
        }
        if (fechaPersonalizada){
          this.requestOnProgress = this.requestOnProgress.filter((e) => e.created_at >= this.inicioPersonalizada);
          this.requestOnProgress = this.requestOnProgress.filter((e) => e.created_at <= this.finPersonalizada);
        }
        console.log(res['requests']);
      },
      err => {
        console.log(err);
      }
    );
  }


  
  cargarLeads(){
    this.cargaReporte2 = false;

    if(!this.onProgress && this.requests.length!=0)
    this.requestService.exportAsExcelFileRequest(this.requests, '24/7_recibidos');
    if(this.onProgress && this.requestOnProgress.length!=0)
    this.requestService.exportAsExcelFileRequest(this.requestOnProgress, '24/7_pendientes');

    this.cargaReporte2 = true;
  }


  getLeads(fechas: NgForm) {
    this.inicioPersonalizada = fechas.value.start.formatted || '';
    this.finPersonalizada = fechas.value.end.formatted || '';

    if(this.inicioPersonalizada!=='' && this.finPersonalizada!==''){
      this.inicioPersonalizada = moment(this.inicioPersonalizada).format('YYYY-MM-DDT00:00:00.000Z');
      this.finPersonalizada = moment(this.finPersonalizada).format('YYYY-MM-DDT23:59:59.999Z');
      console.log(this.inicioPersonalizada+' : '+this.finPersonalizada);
      this.getAllAdminRequest('','','',1);
      this.getAllAdminRequestOnProgress('','','',1);
    }
    

    }

  getSearch(search){
    
    this.getAllAdminRequestOnProgress(search,'','');
    this.getAllAdminRequest(search,'','');
    search='';
  }

  getRequestToday(){
    this.getAllAdminRequest('',1,'');
    this.getAllAdminRequestOnProgress('',1,'');
  };
  getRequestMonth(){
    this.getAllAdminRequest('','',1);
    this.getAllAdminRequestOnProgress('','',1);
  };

  

}
