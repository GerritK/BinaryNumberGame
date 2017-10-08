import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class GameService {
  private _limit = 256;

  public currentNumber: BehaviorSubject<number> = new BehaviorSubject(-1);
  public isRunning: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public endOfTime: BehaviorSubject<number> = new BehaviorSubject(0);
  public score: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
  }

  public startGame() {
    this.score.next(-1);
    this.isRunning.next(true);
    this.nextNumber();
  }

  public nextNumber() {
    if (this.isRunning.getValue()) {
      this.currentNumber.next(Math.floor(Math.random() * (this._limit - 1)) + 1);
      this.endOfTime.next(new Date().getTime() + 60 * 1000);
      this.score.next(this.score.value + 1);
    }
  }
}
