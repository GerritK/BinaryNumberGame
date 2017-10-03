import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'bng-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit, OnDestroy {
  private _ngDestroy: Subject<any>;

  public number: number;
  public isRunning: boolean;

  constructor(private gameService: GameService) {

  }

  ngOnInit() {
    this._ngDestroy = new Subject();

    this.gameService.currentNumber
      .takeUntil(this._ngDestroy)
      .subscribe((number) => {
        this.number = number;
      });

    this.gameService.isRunning
      .takeUntil(this._ngDestroy)
      .subscribe((isRunning) => {
        this.isRunning = isRunning;
      });
  }

  ngOnDestroy() {
    this._ngDestroy.next(true);
    this._ngDestroy.complete();
  }

  public startGame() {
    this.gameService.startGame();
  }
}
