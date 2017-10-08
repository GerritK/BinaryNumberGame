import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'bng-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnChanges {
  @Input('value') value: number;

  @Input('displayType') displayType: 'dec' | 'hex';

  public displayValue: string;

  public digits: string = '0123456789ABCDEF';

  public digit: number;

  ngOnChanges(changes: SimpleChanges) {
    this.displayValue = '';

    if (this.displayType === 'dec') {

      this.displayValue = this.value.toString();

    }
    else if (this.displayType === 'hex') {

      while (this.value > 0) {

        this.digit = this.value % 16;

        this.displayValue = this.digits.charAt(this.digit) + this.displayValue;

        this.value = Math.floor(this.value / 16);
      }
    }
  }
}
