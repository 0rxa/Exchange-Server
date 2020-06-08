import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rows = [{name: "USD", buy: 1.0, sell:1.1}]
  title = 'frontend';
}
