import { Component, EventEmitter, OnInit, ViewChild, Output  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from '../../../service/request.service';

export interface PeriodicElement {
  operador: string;
  tipoDeServicio: string;
  fecha: string;
  estado: string;
}

@Component({
  selector: 'app-request-historial',
  templateUrl: './request-historial.component.html',
  styleUrls: ['./request-historial.component.css']
})
export class RequestHistorialComponent implements OnInit {
  requests: any[] = [];
  ELEMENT_DATA: any[] = [];
  dataSource;
  numeroDeHistorial: number = 0;

  @Output() sendNumber = new EventEmitter();

  constructor(private requestService: RequestService) {
    this.getAllHistorial();
   }

  displayedColumns: string[] = ['operador', 'tipoDeServicio', 'fecha', 'estado'];


  ngOnInit() {}

  lanzar(event){
    // Usamos el método emit
    this.sendNumber.emit({numero: this.numeroDeHistorial});
  }

  public getAllHistorial() {
    this.requestService.getRequests().subscribe(
      res => {
        this.requests = res['requests'];
        this.requests = this.requests.filter((e) => e.estado == 'completada' ||  e.estado == 'cancelada')

        for(let i = 0; i < this.requests.length; i++) {
          const data = {
            operador: this.requests[i].operadorId.name + ' ' +  this.requests[i].operadorId.lastName,
            tipoDeServicio: this.requests[i].tipoDeServicio.nombre ? this.requests[i].tipoDeServicio.nombre : '',
            fecha: this.requests[i].created_at ? this.requests[i].created_at  : '',
            estado:this.requests[i].estado ? this.requests[i].estado : ''
          }

          this.ELEMENT_DATA.push(data);
        }

       this.dataSource = this.ELEMENT_DATA;
       this.numeroDeHistorial = this.ELEMENT_DATA.length;

        console.log('HISTORIAL');
        console.log(this.ELEMENT_DATA);
      },
      err => {
        console.log(err);
      }
    );
  }
}

