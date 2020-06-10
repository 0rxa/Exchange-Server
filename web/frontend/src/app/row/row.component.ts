import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-row',
  template: `
    <div id='currency'><img src="/assets/images/{{row.name}}.png"><span>{{row.name}}</span></div>
    <div class='buy' (keydown)='send($event)' (click)='makeEditable($event)'>{{row.buy}}</div>
    <div class='sell' (keydown)='send($event)' (click)='makeEditable($event)'>{{row.sell}}</div>
  `,
  styles: [`
    @font-face {
      font-family: 'B612 Mono', monospace;
      src: url("https://fonts.googleapis.com/css2?family=B612+Mono&display=swap")
    }

    #currency, .buy, .sell {
      width: 33%;
      display: inline-block;
      position: relative;
      font-weight: bold;
      font-size: 3em;
    }
    span {
      position: absolute;
    }
    img {
      vertical-align: middle;
      position: relative;
      left: 0px;
      right: 3%;
    }
  `]
})
export class RowComponent {
  @Input() row: { name: string, buy: number, sell: number }

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