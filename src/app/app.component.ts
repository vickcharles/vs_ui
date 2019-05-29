import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { WebsocketService } from './service/websocket.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'vs-ui';

  constructor(db: AngularFirestore, private wsService: WebsocketService ) {}

  ngOnInit() {
    this.wsService.emit('mensaje', 'nuevo mesnaje perra')
    this.wsService.listen('mensaje-nuevo').subscribe(res => {
      console.log(res)
    })
  }

}
