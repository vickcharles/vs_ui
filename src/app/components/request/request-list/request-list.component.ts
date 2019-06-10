import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../service/request.service';
import { WebsocketService } from '../../../service/websocket.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html'
})
export class RequestListComponent implements OnInit {
  requests: any;
  requestsOnProgress: any;
  numeroDeHistorials: any;
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
        this.requests = this.requests.filter((e) => e.estado == 'completada' ||  e.estado == 'cancelada')
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
        console.log(res['requests']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
