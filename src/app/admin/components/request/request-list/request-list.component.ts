import { Component, OnInit, ViewChild, Pipe, PipeTransform, Output, EventEmitter } from '@angular/core';
import { RequestService } from '../../../../service/request.service';
import { WebsocketService } from '../../../../service/websocket.service'
import { UserService } from '../../../../service/user.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import * as moment from 'moment';
import { NgForm, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';





@Component({
  selector: 'app-admin-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class AdminRequestListComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'celular', 'correo', 'modalidad', 'ciudad'];
  requestOnProgress: any;
  requestNew: any;
  requestRejected: any;
  requestCompleted: any;
  requestAll: any;
  UserId: any;
  filter: string;
  fechaInicio: any;
  fechaFinal: any;
  pdf = 'false';
  excel = 'false';
  cargaReporte1 = true;
  cargaReporte2 = true;
  selectionStatusLead: any[] = ['recibido', 'en proceso', 'cancelado', ''];
  selectionStatus: any[] = [ true, false , false, false];
  selectionStatusName: any[] = ['Nueva solicitud', 'Solicitud atentida' , 'Cotización realizada', 'Negocio efectivo'];


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
    this.getAdminRequestNew(this.filter, this.fechaInicio, this.fechaFinal);
    this.getAdminRequestOnProgress(this.filter, this.fechaInicio, this.fechaFinal);
    this.getAdminRequestRejected(this.filter, this.fechaInicio, this.fechaFinal);
    this.getAdminRequestCompleted(this.filter, this.fechaInicio, this.fechaFinal);
    this.getAdminRequestAll(this.filter, this.fechaInicio, this.fechaFinal);


    this.wsService.listen('new-notifications')
      .subscribe((res: any) => {
        if(res.receiver == this.UserId) {
          this.getAdminRequestNew(this.filter, this.fechaInicio, this.fechaFinal);
        }
      });

    this.search.valueChanges.pipe(debounceTime(600)).subscribe(value => {this.searchEmitter.emit(value);
      this.getSearch(value);
    
    })
    
  }

  search = new FormControl('');
  @Output('search') searchEmitter =  new EventEmitter<string>();

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


  public toggleMenuRequestNew() {
    this.selectionStatus = [ true, false , false, false];
  }

  public toggleMenuRequestOnProgress() {
    this.selectionStatus = [ false, true , false, false];
  }

  public toggleMenuRequestRejected() {
    this.selectionStatus = [ false, false , true, false];
  }

  public toggleMenuRequestCompleted() {
    this.selectionStatus = [ false, false , false, true];
  }

  /* ============================================================
  Generar excel según estado de lead
  =============================================================== */

  cargarLeads(){
    this.cargaReporte2 = false;

    if(this.selectionStatus[0] === true && this.requestNew.length!=0)
    this.requestService.exportAsExcelFileRequest(this.requestNew, '24/7_pendientes');
    if(this.selectionStatus[1] === true && this.requestOnProgress.length!=0)
    this.requestService.exportAsExcelFileRequest(this.requestOnProgress, '24/7_recibidos');
    if(this.selectionStatus[2] === true && this.requestRejected.length!=0)
    this.requestService.exportAsExcelFileRequest(this.requestRejected, '24/7_cancelados');
    if(this.selectionStatus[3] === true && this.requestCompleted.length!=0)
    this.requestService.exportAsExcelFileRequest(this.requestCompleted, '24/7_completados');

    this.cargaReporte2 = true;
  }

  cargarLeadsTodos(){
    this.cargaReporte1 = false;

    if(this.requestAll.length!=0)
    this.requestService.exportAsExcelFileRequest(this.requestAll, '24/7_todos_los_requerimientos');

    this.cargaReporte1 = true;
  }

  /* ============================================================
  Funciones para cada estado de los leads
  =============================================================== */

  getAdminRequestOnProgress(filterValue, fechaInicio, fechaFinal, fechaPersonalizada?) {
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
          //console.log('FECHA CANCELADOS: '+fechaInicio);
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
        //console.log(res['requests']);
      },
      err => {
        console.log(err);
      }
    );
  }

  getAdminRequestRejected(filterValue, fechaInicio, fechaFinal, fechaPersonalizada?) {
    this.requestService.getAdminRequests().subscribe(
      res => {
        this.requestRejected = res['requests'];
        this.requestRejected = this.requestRejected.filter((e) => e.estado === 'cancelada');
        if (filterValue){
          this.requestRejected = this.requestRejected.filter((e) => e.usuario.name.toLowerCase().indexOf(filterValue.toLowerCase())!==-1);
        }
        if (fechaInicio){
          fechaInicio = moment().format('YYYY-MM-DDT00:00:00.000Z');
          this.requestRejected = this.requestRejected.filter((e) => e.created_at >= fechaInicio);
          //console.log('FECHA CANCELADOS: '+fechaInicio);
        }
        if (fechaFinal){
          this.fin = moment().format('YYYY-MM-DDT23:59:59.999Z');
          this.inicio = moment().startOf('month').format('YYYY-MM-DDT00:00:00.000Z');
          //console.log('fecha fin: '+this.fin);
          //console.log('fecha inicio: '+this.inicio);
          this.requestRejected = this.requestRejected.filter((e) => e.created_at >= this.inicio);
          this.requestRejected = this.requestRejected.filter((e) => e.created_at <= this.fin);
        }
        if (fechaPersonalizada){
          this.requestRejected = this.requestRejected.filter((e) => e.created_at >= this.inicioPersonalizada);
          this.requestRejected = this.requestRejected.filter((e) => e.created_at <= this.finPersonalizada);
        }
        //console.log(res['requests']);
      },
      err => {
        console.log(err);
      }
    );
  }

  getAdminRequestNew(filterValue, fechaInicio, fechaFinal, fechaPersonalizada?) {
    this.requestService.getAdminRequests().subscribe(
      res => {
        this.requestNew = res['requests'];
        this.requestNew = this.requestNew.filter((e) => e.estado === 'recibido');
        if (filterValue){
          this.requestNew = this.requestNew.filter((e) => e.usuario.name.toLowerCase().indexOf(filterValue.toLowerCase())!==-1);
        }
        if (fechaInicio){
          fechaInicio = moment().format('YYYY-MM-DDT00:00:00.000Z');
          this.requestNew = this.requestNew.filter((e) => e.created_at >= fechaInicio);
          //console.log('FECHA CANCELADOS: '+fechaInicio);
        }
        if (fechaFinal){
          this.fin = moment().format('YYYY-MM-DDT23:59:59.999Z');
          this.inicio = moment().startOf('month').format('YYYY-MM-DDT00:00:00.000Z');
          //console.log('fecha fin: '+this.fin);
          //console.log('fecha inicio: '+this.inicio);
          this.requestNew = this.requestNew.filter((e) => e.created_at >= this.inicio);
          this.requestNew = this.requestNew.filter((e) => e.created_at <= this.fin);
        }
        if (fechaPersonalizada){
          this.requestNew = this.requestNew.filter((e) => e.created_at >= this.inicioPersonalizada);
          this.requestNew = this.requestNew.filter((e) => e.created_at <= this.finPersonalizada);
        }
        //console.log(res['requests']);
      },
      err => {
        console.log(err);
      }
    );
  }

  getAdminRequestCompleted(filterValue, fechaInicio, fechaFinal, fechaPersonalizada?) {
    this.requestService.getAdminRequests().subscribe(
      res => {
        this.requestCompleted = res['requests'];
        this.requestCompleted = this.requestCompleted.filter((e) => e.estado === 'completada');
        if (filterValue){
          this.requestCompleted = this.requestCompleted.filter((e) => e.usuario.name.toLowerCase().indexOf(filterValue.toLowerCase())!==-1);
        }
        if (fechaInicio){
          fechaInicio = moment().format('YYYY-MM-DDT00:00:00.000Z');
          this.requestCompleted = this.requestCompleted.filter((e) => e.created_at >= fechaInicio);
          //console.log('FECHA CANCELADOS: '+fechaInicio);
        }
        if (fechaFinal){
          this.fin = moment().format('YYYY-MM-DDT23:59:59.999Z');
          this.inicio = moment().startOf('month').format('YYYY-MM-DDT00:00:00.000Z');
          //console.log('fecha fin: '+this.fin);
          //console.log('fecha inicio: '+this.inicio);
          this.requestCompleted = this.requestCompleted.filter((e) => e.created_at >= this.inicio);
          this.requestCompleted = this.requestCompleted.filter((e) => e.created_at <= this.fin);
        }
        if (fechaPersonalizada){
          this.requestCompleted = this.requestCompleted.filter((e) => e.created_at >= this.inicioPersonalizada);
          this.requestCompleted = this.requestCompleted.filter((e) => e.created_at <= this.finPersonalizada);
        }
        //console.log(res['requests']);
      },
      err => {
        console.log(err);
      }
    );
  }

  getAdminRequestAll(filterValue, fechaInicio, fechaFinal, fechaPersonalizada?) {
    this.requestService.getAdminRequests().subscribe(
      res => {
        this.requestAll = res['requests'];
        if (filterValue){
          this.requestAll = this.requestAll.filter((e) => e.usuario.name.toLowerCase().indexOf(filterValue.toLowerCase())!==-1);
        }
        if (fechaInicio){
          fechaInicio = moment().format('YYYY-MM-DDT00:00:00.000Z');
          this.requestAll = this.requestAll.filter((e) => e.created_at >= fechaInicio);
          //console.log('FECHA CANCELADOS: '+fechaInicio);
        }
        if (fechaFinal){
          this.fin = moment().format('YYYY-MM-DDT23:59:59.999Z');
          this.inicio = moment().startOf('month').format('YYYY-MM-DDT00:00:00.000Z');
          //console.log('fecha fin: '+this.fin);
          //console.log('fecha inicio: '+this.inicio);
          this.requestAll = this.requestAll.filter((e) => e.created_at >= this.inicio);
          this.requestAll = this.requestAll.filter((e) => e.created_at <= this.fin);
        }
        if (fechaPersonalizada){
          this.requestAll = this.requestAll.filter((e) => e.created_at >= this.inicioPersonalizada);
          this.requestAll = this.requestAll.filter((e) => e.created_at <= this.finPersonalizada);
        }
        //console.log(res['requests']);
      },
      err => {
        console.log(err);
      }
    );
  }

  /* ============================================================
  Validacion de campos de filtro
  =============================================================== */

  getSearch(search){
    this.getAdminRequestOnProgress(search,'','');
    this.getAdminRequestRejected(search,'','');
    this.getAdminRequestNew(search,'','');
    this.getAdminRequestCompleted(search,'','');
    this.getAdminRequestAll(search,'','');
    search='';
  }

  getRequestToday(){
    this.getAdminRequestOnProgress('',1,'');
    this.getAdminRequestRejected('',1,'');
    this.getAdminRequestNew('',1,'');
    this.getAdminRequestCompleted('',1,'');
    this.getAdminRequestAll('',1,'');
  };

  getRequestMonth(){
    this.getAdminRequestOnProgress('','',1);
    this.getAdminRequestRejected('','',1);
    this.getAdminRequestNew('','',1);
    this.getAdminRequestCompleted('','',1);
    this.getAdminRequestAll('','',1);
  };

  getCustomDate(fechas: NgForm) {
    this.inicioPersonalizada = fechas.value.start.formatted || '';
    this.finPersonalizada = fechas.value.end.formatted || '';

    if(this.inicioPersonalizada!=='' && this.finPersonalizada!==''){
      this.inicioPersonalizada = moment(this.inicioPersonalizada).format('YYYY-MM-DDT00:00:00.000Z');
      this.finPersonalizada = moment(this.finPersonalizada).format('YYYY-MM-DDT23:59:59.999Z');
      //console.log(this.inicioPersonalizada+' : '+this.finPersonalizada);
      this.getAdminRequestOnProgress('','','',1);
      this.getAdminRequestRejected('','','',1);
      this.getAdminRequestNew('','','',1);
      this.getAdminRequestCompleted('','','',1);
      this.getAdminRequestAll('','','',1);
    }
  }

}
