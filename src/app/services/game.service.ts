import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {HighscoreService} from './highscore.service';

@Injectable()
export class GameService {
  private limit = 256;
  private remainingTimerSub: Subscription;

  public currentNumber: BehaviorSubject<number> = new BehaviorSubject(-1);
  public isRunning: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public endOfTime: BehaviorSubject<number> = new BehaviorSubject(0);
  public remainingTime: BehaviorSubject<number> = new BehaviorSubject(0);
  public score: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    this.isRunning.subscribe((isRunning) => {
      if (!isRunning && this.remainingTimerSub != null) {
        this.remainingTimerSub.unsubscribe();
        this.remainingTimerSub = null;
      }
    });

    this.endOfTime.subscribe(() => {
      if (this.isRunning.getValue()) {
        this.calculateRemainingTime();
      }
    });
  }

  public startGame() {
    this.score.next(-1);
    this.isRunning.next(true);

    if (this.remainingTimerSub == null) {
      this.remainingTimerSub = Observable.interval(250)
        .subscribe(() => this.calculateRemainingTime());
    }

    this.nextNumber();
  }

  public stopGame() {
    this.score.next(0);
    this.remainingTime.next(0);
    this.isRunning.next(false);
  }

  public nextNumber() {
    if (this.isRunning.getValue()) {
      this.currentNumber.next(Math.floor(Math.random() * (this.limit - 1)) + 1);
      this.endOfTime.next(new Date().getTime() + 15 * 1000 + this.remainingTime.getValue());
      this.score.next(this.score.value + 1);
    }
  }

  private calculateRemainingTime() {
    let remainingTime;

    if (!this.endOfTime.getValue()) {
      remainingTime = 0;
    } else {
      remainingTime = this.endOfTime.getValue() - new Date().getTime();
    }

    if (remainingTime <= 0) {
      remainingTime = 0;
      this.stopGame();
    }

    this.remainingTime.next(remainingTime);
  }
}
