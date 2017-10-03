import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GameService {
  private _currentNumber: BehaviorSubject<number> = new BehaviorSubject(-1);

  public currentNumber: Observable<number> = this._currentNumber.asObservable();

  constructor() {
  }
}
