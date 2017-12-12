import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'bng-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnChanges {
  @Input() remainingTime: number;

  public alarm: boolean;

  ngOnChanges(changes: SimpleChanges) {
    this.alarm = this.remainingTime <= 10 * 1000;
  }
}
