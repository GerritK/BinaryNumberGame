import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'bng-demo-view',
  templateUrl: './demo-view.component.html',
  styleUrls: ['./demo-view.component.css']
})
export class DemoViewComponent {
  public currentNumber = 0;
}
