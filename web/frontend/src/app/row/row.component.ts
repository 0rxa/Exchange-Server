import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-row',
  template: `
      <div><img src="/assets/images/{{row.name}}.png">{{row.name}}</div>
      <div class='buy'  (keydown)='send($event)' (click)='makeEditable($event)'>{{row.buy}}</div>
      <div class='sell' (keydown)='send($event)' (click)='makeEditable($event)'>{{row.sell}}</div>
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

  makeEditable(evt) {
    let element = evt.toElement;
    element.setAttribute('contenteditable', true);
  }

  send(evt) {
    if(evt.key !== 'Enter') { return; }
    let element = evt.target;
    element.setAttribute("contenteditable", "false");

    let direction = element.getAttribute("class");
    let value = element.textContent;

    let obj = {
      "name": this.row.name,
      [direction]: parseFloat(value)
    }

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", 'http://localhost:8080/update');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(obj));

  }
}