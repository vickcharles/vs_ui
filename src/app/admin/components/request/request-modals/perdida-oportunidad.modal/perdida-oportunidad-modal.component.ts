import { Component, OnInit, DoCheck, Inject } from '@angular/core';
import { RequestService, Causal } from '../../../../../service/request.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from "@angular/router";
import { WebsocketService } from '../../../../../service/websocket.service'

@Component({
  selector: 'app-perdida-oportunidad-modal',
  templateUrl: './perdida-oportunidad-modal.component.html',
  styleUrls: ['./perdida-oportunidad-modal.component.css']
})

export class PerdidaOportunidadModalComponent implements OnInit, DoCheck {
  // public message;
  public perdidaOportunidad: string[] = [];
  public valorEscojido: string[] = [];
  public causal: Causal = {
    id_causal: '',
    mensaje: ''
  };

  causalEscojida: string;
  causales: string[] = ['Oportunidad perdida'];

  constructor(public _requestService: RequestService, 
    private wsService: WebsocketService,
    public router: Router,
    public dialogRef: MatDialogRef<PerdidaOportunidadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.getCausal();
  }

  getCausal() {
    this._requestService.getCausal().subscribe((res: any) => {
      for (const iterator of res) {
        if (iterator.type === 'Oportunidad perdida' && iterator.status === 'ACTIVO') {
          this.perdidaOportunidad.push(iterator);
        }
      }
    });
  }

  escogerCausal() {
    console.log(this.causalEscojida);
  }

  ngOnInit() {
  }

  ngDoCheck() {
    if (this.causalEscojida === 'Oportunidad perdida') {
      this.valorEscojido = this.perdidaOportunidad;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar() {
    this._requestService.addCausal(this.causal, this.data.id_lead ).subscribe(res => {
      this._requestService.updateStatus(this.data.id_lead, { status: "cancelada"}).subscribe(
        res => {
          this.wsService.emit('notifications', this.data.payload)
          this.router.navigate(['/dashboard/admin']);
        },
        err => {
          console.log(err);
        }
      );
      this.onNoClick();
    });
  }
}
