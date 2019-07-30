import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {UsernameDialogComponent} from '../dialogs/username-dialog/username-dialog.component';

@Injectable()
export class HighscoreService {
  private static readonly STATS_API = 'https://api.globalstats.io/';
  private static readonly CLIENT_ID = 'fI3t9G0dZTdm0z85umwHpRsxOkPE7JdmrhPBXPOW';
  private static readonly CLIENT_SECRET = '1jJBsO5OlNedfM1ABGHkU4MbTn9Jb5sdpbPR0VGl';

  private highscores: any = {};
  private token: string;

  constructor(private http: HttpClient,
              private dialog: MatDialog) {
    this.loadHighscore();
  }

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

    if (score > 0) {
      this.submitHighscore(score, mode);
    }
  }

  public loadLeaderboard(mode: 'dec' | 'hex'): Observable<any> {
    return this.getToken()
      .pipe(
        flatMap((token) => {
          const options = {
            headers: {
              Authorization: 'Bearer ' + token
            }
          };

          return this.http.post(HighscoreService.STATS_API + 'v1/gtdleaderboard/' + mode + 'Score', {
            limit: 25
          }, options);
        })
      );
  }

  private loadHighscore() {
    const statisticsId = localStorage.getItem('userStatistics');

    if (!statisticsId) {
      return;
    }

    this.getToken()
      .pipe(
        flatMap((token) => {
          const options = {
            headers: {
              Authorization: 'Bearer ' + token
            }
          };

          return this.http.get(HighscoreService.STATS_API + 'v1/statistics/' + statisticsId, options);
        })
      )
      .subscribe((res: any) => {
        for (const stat of res.statistics) {
          switch (stat.key) {
            case 'decScore':
              this.highscores.dec = stat.value;
              break;
            case 'hexScore':
              this.highscores.hex = stat.value;
              break;
          }
        }
      });
  }

  private submitHighscore(score: number, mode: 'dec' | 'hex') {
    this.getToken()
      .pipe(
        flatMap((token) => {
          const options = {
            headers: {
              Authorization: 'Bearer ' + token
            }
          };

          const statisticsId = localStorage.getItem('userStatistics');
          const values: any = {};

          if (mode === 'dec') {
            values.decScore = score;
          } else if (mode === 'hex') {
            values.hexScore = score;
          }

          if (statisticsId == null) {
            const dialogRef = this.dialog.open(UsernameDialogComponent);

            return dialogRef.afterClosed()
              .pipe(
                flatMap((username: string) => {
                  if (username == null) {
                    throw new Error();
                  }

                  return this.http.post(HighscoreService.STATS_API + 'v1/statistics', {
                    name: username,
                    values
                  }, options);
                })
              );
          } else {
            return this.http.put(HighscoreService.STATS_API + 'v1/statistics/' + statisticsId, {
              values
            }, options);
          }
        })
      )
      .subscribe((res: any) => {
        if (res._id) {
          localStorage.setItem('userStatistics', res._id);
        }
      });
  }

  private getToken(): Observable<string> {
    if (this.token != null) {
      return of(this.token);
    }

    return this.http.post(HighscoreService.STATS_API + 'oauth/access_token', {
      grant_type: 'client_credentials',
      scope: 'endpoint_client',
      client_id: HighscoreService.CLIENT_ID,
      client_secret: HighscoreService.CLIENT_SECRET
    }).pipe(
      map((res: any) => {
        this.token = res.access_token;
        return this.token;
      })
    );
  }
}
