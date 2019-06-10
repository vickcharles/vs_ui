import { Component, OnInit, ViewChild } from '@angular/core';
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
  ELEMENT_DATA: any[] = [{
    operador: 'Maris',
    tipoDeServicio: 'Transporte de carga',
    fecha: '26/7/2019 9.30am',
    estado: 'completada'
  },
  {
    operador: 'Maris',
    tipoDeServicio: 'Transporte de carga',
    fecha: '26/7/2019 9.30am',
    estado: 'completada'
  }];

  constructor(private requestService: RequestService) {
    // this.getAllHistorial();
   }

  displayedColumns: string[] = ['operador', 'tipoDeServicio', 'fecha', 'estado'];
  dataSource = this.ELEMENT_DATA;

  ngOnInit() {}

  public getAllHistorial() {
    this.requestService.getRequests().subscribe(
      res => {
        this.requests = res['requests'];
        this.requests = this.requests.filter((e) => e.estado === 'completada' || e.estado === 'cancelada')
        console.log('HISTORIAL JJJ');
        console.log(this.requests);

        for(let i = 0; i <= this.requests.length; i++) {
          let data = {
            operador: this.requests[i].operadorId.name ? this.requests[i].operadorId.name : '',
            tipoDeServicio: this.requests[i].tipoDeServicio.nombre,
            fecha: this.requests[i].created_at,
            estado:this.requests[i].estado
          }

          this.ELEMENT_DATA.push(data);
        }
        console.log('HISTORIAL');
        console.log(this.ELEMENT_DATA);
      },
      err => {
        console.log(err);
      }
    );
  }
}

