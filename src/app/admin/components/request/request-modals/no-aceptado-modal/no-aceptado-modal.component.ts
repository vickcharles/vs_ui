import { Component, OnInit, DoCheck, Inject } from '@angular/core';
import { RequestService, Causal } from '../../../../../service/request.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ActivatedRoute, Router } from "@angular/router";
import { WebsocketService } from '../../../../../service/websocket.service'

@Component({
  selector: 'app-no-aceptado-modal',
  templateUrl: './no-aceptado-modal.component.html',
  styleUrls: ['./no-aceptado-modal.component.css']
})

export class NoAceptadoModalComponent implements OnInit, DoCheck {
  // public message;
  public noAceptada: string[] = [];
  public valorEscojido: string[] = [];
  public causal: Causal = {
    id_causal: '',
    mensaje: ''
  };

  causalEscojida: string = 'No aceptada';
  causales: string[] = ['No aceptada'];

  constructor(public _requestService: RequestService, 
    private wsService: WebsocketService,
    public router: Router,
    public dialogRef: MatDialogRef<NoAceptadoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.getCausal();
  }

  getCausal() {
    this._requestService.getCausal().subscribe((res: any) => {
      for (const iterator of res) {
        if (iterator.type === 'No aceptada' && iterator.status === 'ACTIVO') {
          this.noAceptada.push(iterator);
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
    if (this.causalEscojida === 'No aceptada') {
      this.valorEscojido = this.noAceptada;
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
