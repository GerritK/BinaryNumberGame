import {Component, OnInit} from '@angular/core';
import {HighscoreService} from '../../services/highscore.service';

@Component({
  selector: 'bng-leaderboard-view',
  templateUrl: './leaderboard-view.component.html',
  styleUrls: ['./leaderboard-view.component.css']
})
export class LeaderboardViewComponent implements OnInit {
  public data;
  public displayedColumns = ['rank', 'name', 'score'];

  public get useHex(): boolean {
    return this._useHex;
  }

  public set useHex(value: boolean) {
    this._useHex = value;
    this.loadLeaderboard();
  }

  private _useHex = false;

  constructor(private highscore: HighscoreService) {
  }

  ngOnInit() {
    this.loadLeaderboard();
  }

  private loadLeaderboard() {
    this.highscore.loadLeaderboard(this.useHex ? 'hex' : 'dec')
      .subscribe((res) => {
        this.data = res.data;
      });
  }
}
