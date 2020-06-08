import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  rows = null;

  ngOnInit() {
    let ws = new WebSocket('ws://localhost:8080')
    ws.onmessage = (event) => {
      let payload = JSON.parse(event.data);
      if(Object.keys(payload).includes('currencies')) {
        this.rows = payload.data;
      }
      else {
        let ix = this.rows.findIndex(row => row.name === payload.name);
        let direction = Object.keys(payload)[1];
        this.rows[ix][direction] = payload[direction];
      }
    };
  }
}