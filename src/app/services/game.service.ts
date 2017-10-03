import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class GameService {
  private _limit = 256;

  public currentNumber: BehaviorSubject<number> = new BehaviorSubject(-1);
  public isRunning: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }

  public startGame() {
    this.isRunning.next(true);
    this.nextNumber();
  }

  public nextNumber() {
    if (this.isRunning.getValue()) {
      this.currentNumber.next(Math.floor(Math.random() * this._limit));
    }
  }
}
