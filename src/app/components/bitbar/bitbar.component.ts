import {Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'bng-bitbar',
  templateUrl: './bitbar.component.html',
  styleUrls: ['./bitbar.component.css']
})
export class BitbarComponent implements OnChanges {
  @Input() value: number;
  @Output() valueChange: EventEmitter<number> = new EventEmitter();
  @Input() disabled: boolean;
  @Input() limit;

  public bits;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.limit) {
      this.generateBits();
    }

    if (changes.value != null) {
      this.updateSelection();
    }
  }

  @HostListener('body:keyup', ['$event'])
  onKeyDown(event) {
    if (!this.disabled) {
      const value = Number.parseInt(event.key, 10);
      if (value != null && this.bits[value - 1] != null) {
        this.bits[value - 1].selected = !this.bits[value - 1].selected;

        this.onChange();
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

  private generateBits() {
    const bits = [];

    if (this.limit === 0 || Math.log2(this.limit) % 1 !== 0) {
      throw new Error('limit "' + this.limit + '" is not power of 2');
    }

    for (let bit = this.limit / 2; bit >= 1; bit = bit / 2) {
      bits.push({
        value: bit,
        selected: false
      });
    }

    this.bits = bits;

    this.updateSelection();
  }

  private updateSelection() {
    if (this.value >= this.limit || this.value < 0) {
      throw new Error('can not display value "' + this.value + '" with limit "' + this.limit + '"');
    }

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
