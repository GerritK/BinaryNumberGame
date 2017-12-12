import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Subject} from 'rxjs/Subject';
import {HighscoreService} from '../../services/highscore.service';

@Component({
  selector: 'bng-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit, OnDestroy {
  private ngDestroy: Subject<any>;

  public mode: 'highscore' | 'game' | 'score' = 'highscore';
  public endScore: number;

  public number = 0;
  public isRunning = false;
  public remainingTime: number;
  public score: number;
  public highscore: number;

  public userNumber = 0;
  public correctNumber = false;
  public useHex = false;

  constructor(private gameService: GameService,
              private highscoreService: HighscoreService) {
  }

  ngOnInit() {
    this.onUseHexChange(this.useHex);

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

          if (!isRunning && this.mode === 'game') {
            this.setMode('score');
          }
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
    this.setMode('game');
    this.gameService.startGame();
  }

  public stopGame() {
    this.setMode('score');
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

  public onUseHexChange(useHex) {
    this.highscore = this.highscoreService.getHighscore(useHex ? 'hex' : 'dec');
  }

  public setMode(mode: 'highscore' | 'game' | 'score') {
    switch (mode) {
      case 'highscore':
        if (this.mode === 'score') {
          this.highscoreService.setHighscore(this.endScore, this.useHex ? 'hex' : 'dec');
        }
        this.onUseHexChange(this.useHex);
        break;

      case 'game':
        break;

      case 'score':
        this.endScore = this.score;
        break;
    }

    this.mode = mode;
  }
}
