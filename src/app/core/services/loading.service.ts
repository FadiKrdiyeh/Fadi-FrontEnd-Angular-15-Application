import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service to run and hide loading depend on request
 *
 * @export
 * @class LoadingService
 */
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

  /**
   * Get loadin observale
   *
   * @return {*}  {Observable<string>}
   * @memberof LoadingService
   */
  getLoadingObserver (): Observable<string> {
    return this._loading$.asObservable();
  }

  /**
   * Start the loading when request sent
   *
   * @memberof LoadingService
   */
  requestStarted () {
    if (++this._count === 1) {
      this._loading$.next('start');
    }
  }

  /**
   * Stop the loading after request end
   *
   * @memberof LoadingService
   */
  requestEnded () {
    if (this._count === 0 || --this._count === 0) {
      this._loading$.next('stop');
    }
  }

  /**
   * Reset loading and hide it if something went wrong
   *
   * @memberof LoadingService
   */
  resetLoading () {
    this._count = 0;
    this._loading$.next('stop');
  }
}
