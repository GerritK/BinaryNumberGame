import {Injectable} from '@angular/core';

@Injectable()
export class HighscoreService {
  private highscores = {};

  public getHighscore(mode: 'dec' | 'hex') {
    if (this.highscores[mode] != null) {
      return this.highscores[mode];
    }

    return 0;
  }

  public setHighscore(score: number, mode: 'dec' | 'hex') {
    const currentHighscore = this.getHighscore(mode);

    if (score > currentHighscore) {
      this.highscores[mode] = score;
    }
  }
}
