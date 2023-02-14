import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _count: number;
  private _loading$;

  constructor() {
    this._count = 0;
    this._loading$ = new BehaviorSubject<string>('')
  }

  getLoadingObserver (): Observable<string> {
    return this._loading$.asObservable();
  }

  requestStarted () {
    if (++this._count === 1) {
      this._loading$.next('start');
    }
  }

  requestEnded () {
    if (this._count === 0 || --this._count === 0) {
      this._loading$.next('stop');
    }
  }

  resetLoading () {
    this._count = 0;
    this._loading$.next('stop');
  }
}
