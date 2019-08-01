import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {first, flatMap, map, skipWhile} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {UsernameDialogComponent} from '../dialogs/username-dialog/username-dialog.component';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import * as moment from 'moment';
import {Moment} from 'moment';

@Injectable()
export class HighscoreService {
  private static readonly STATS_API = 'https://api.globalstats.io/';
  private static readonly CLIENT_ID = 'fI3t9G0dZTdm0z85umwHpRsxOkPE7JdmrhPBXPOW';
  private static readonly CLIENT_SECRET = '1jJBsO5OlNedfM1ABGHkU4MbTn9Jb5sdpbPR0VGl';

  private readonly token$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private readonly highscores$: BehaviorSubject<any> = new BehaviorSubject<any>({
    dec: 0,
    hex: 0
  });
  public readonly highscores: Observable<any> = this.highscores$.asObservable();

  private tokenExpiration: Moment;
  private requestingToken: boolean;

  constructor(private http: HttpClient,
              private dialog: MatDialog) {
    this.loadHighscore();
  }

  public getHighscore(mode: 'dec' | 'hex'): Observable<number> {
    return this.highscores.pipe(
      map((highscores) => {
        return highscores[mode];
      })
    );
  }

  public setHighscore(score: number, mode: 'dec' | 'hex') {
    const highscores = this.highscores$.getValue();

    if (score > highscores[mode]) {
      highscores[mode] = score;
      this.highscores$.next(highscores);
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
        const highscores = this.highscores$.getValue();

        for (const stat of res.statistics) {
          switch (stat.key) {
            case 'decScore':
              highscores.dec = stat.value;
              break;
            case 'hexScore':
              highscores.hex = stat.value;
              break;
          }
        }

        this.highscores$.next(highscores);
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
    if (this.token$.getValue() != null && this.tokenExpiration.isAfter(moment())) {
      return of(this.token$.getValue());
    }

    if (!this.requestingToken) {
      this.requestingToken = true;
      const start = moment();

      this.http.post(HighscoreService.STATS_API + 'oauth/access_token', {
        grant_type: 'client_credentials',
        scope: 'endpoint_client',
        client_id: HighscoreService.CLIENT_ID,
        client_secret: HighscoreService.CLIENT_SECRET
      }).subscribe((res: any) => {
        this.token$.next(res.access_token);
        this.tokenExpiration = start.add(res.expires_in, 'seconds');
        this.requestingToken = false;
      });
    }

    return this.token$.pipe(skipWhile((token) => token == null), first());
  }
}
