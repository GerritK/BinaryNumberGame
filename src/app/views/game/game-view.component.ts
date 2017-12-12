import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'bng-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit, OnDestroy {
  private ngDestroy: Subject<any>;

  public number = 0;
  public isRunning = false;
  public remainingTime: number;
  public score: number;

  public userNumber = 0;

  public correctNumber = false;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.ngDestroy = new Subject();

    this.gameService.currentNumber
      .takeUntil(this.ngDestroy)
      .subscribe((number) => {
        this.number = number;
      });

    this.gameService.isRunning
      .takeUntil(this.ngDestroy)
      .subscribe((isRunning) => {
        if (this.isRunning !== isRunning) {
          this.userNumber = 0;
        }

        this.isRunning = isRunning;
      });

    this.gameService.remainingTime
      .takeUntil(this.ngDestroy)
      .subscribe((remainingTime) => {
        this.remainingTime = remainingTime;
      });

    this.gameService.score
      .takeUntil(this.ngDestroy)
      .subscribe((score) => {
        this.score = score;
      });
  }

  ngOnDestroy() {
    this.ngDestroy.next(true);
    this.ngDestroy.complete();
  }

  public startGame() {
    this.gameService.startGame();
  }

  public stopGame() {
    this.gameService.stopGame();
  }

  public checkNumber() {
    this.correctNumber = this.userNumber === this.number;

    if (this.correctNumber) {
      setTimeout(() => {
        this.userNumber = 0;
        this.gameService.nextNumber();
        this.correctNumber = false;
      }, 500);
    }
  }
}
