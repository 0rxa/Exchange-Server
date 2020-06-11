import { Component, Input, ViewChild } from '@angular/core';
import { environment } from './../../environments/environment'

@Component({
  selector: 'app-row',
  template: `
    <div id='currency'><img src="/assets/images/{{row.name}}.png"><span>{{row.name}}</span></div>
    <div #buy class='buy'>{{row.buy}}</div>
    <div #sell class='sell'>{{row.sell}}</div>
  `,
  styleUrls: ['./row.component.css']
})

export class RowComponent {
  @Input() row: { name: string, buy: number, sell: number }
  @ViewChild('buy') buy: any;
  @ViewChild('sell') sell: any;

  ngAfterViewInit() {
    ['buy', 'sell'].forEach(direction => {
      this[direction].nativeElement.addEventListener('click', this.makeEditable);
      this[direction].nativeElement.addEventListener('keydown', this.send);
    });
  }

  makeEditable(evt) {
    let element = evt.toElement;
    element.setAttribute('contenteditable', true);
  }

  send = (evt) => {
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
    xhr.open("PUT", `http://${environment.api}/update`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(obj));
  }
}