import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'bng-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnChanges {
  @Input('value') value = 0;

  @Input('displayType') displayType: 'dec' | 'hex';

  public displayValue: string;

  ngOnChanges(changes: SimpleChanges) {
    this.displayValue = '';

    if (this.displayType === 'dec') {
      this.displayValue = this.value.toString();
    } else if (this.displayType === 'hex') {
      this.displayValue = this.value.toString(16).toUpperCase();
    }
  }
}
