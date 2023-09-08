import { Injectable } from '@angular/core';
import { ISitHttpBodyRequest } from '../interfaces/http-requests/ISitHttpBodyRequest';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  private initialAmountBalanceArray: number[] = [10, 25, 50, 100, 250, 500, 1000];

  private _balance: number = 0;
  private _balance$ = new BehaviorSubject(this._balance);
  public balance$ = this._balance$.asObservable();

  constructor() {

  }

  private randomInitialAmount(arr: number[]): number {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  getRandomInitialAmount(): Observable<number> {
    return this.balance$;
  }

  setRandomInitialAmount(): void {
    this._balance = this.randomInitialAmount(this.initialAmountBalanceArray);
    this._balance$.next(this._balance);
  }

}
