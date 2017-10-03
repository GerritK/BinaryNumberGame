import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'bng-bitbar',
  templateUrl: './bitbar.component.html',
  styleUrls: ['./bitbar.component.css']
})
export class BitbarComponent implements OnChanges {
  @Input('value') value: number;
  @Output('valueChange') valueChange: EventEmitter<number> = new EventEmitter();

  public bits = [
    {value: 128, selected: false},
    {value: 64, selected: false},
    {value: 32, selected: false},
    {value: 16, selected: false},
    {value: 8, selected: false},
    {value: 4, selected: false},
    {value: 2, selected: false},
    {value: 1, selected: false},
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value != null) {
      let valueResidue = this.value;
      for (const bit of this.bits) {
        if (valueResidue >= bit.value) {
          valueResidue -= bit.value;
          bit.selected = true;
        } else {
          bit.selected = false;
        }
      }
    }
  }

  public onChange() {
    const sum = this.bits.reduce((acc, bit) => {
      if (bit.selected) {
        acc = acc + bit.value;
      }
      return acc;
    }, 0);

    this.valueChange.emit(sum);
  }
}
