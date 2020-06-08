import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-row',
  template: `
      <div><img src="/assets/images/{{row.name}}.png">{{row.name}}</div>
      <div>{{row.buy}}</div>
      <div>{{row.sell}}</div>
  `,
  styles: [`
    div {
      width: 33%;
      display: inline-block;
      position: relative;
      font-weight: bold;
      font-size: 3em;
    }
    img {
      max-width: 100%;
      max-height: 100%;
      position: absolute;
      left: 30%;
      margin: auto;
    }
  `]
})
export class RowComponent {
  @Input() row: { name: String, buy: Number, sell: Number }
}