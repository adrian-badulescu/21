import { Injectable } from '@angular/core';
import { IPlayer } from '../interfaces/IPlayer';
import { BackendService } from './backend.service';
import { RandomService } from './random.service';
import { ISitHttpBodyRequest } from '../interfaces/http-requests/ISitHttpBodyRequest';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ISitHttpResponse } from '../interfaces/http-responses/ISitHttpResponse';
import { IDealHttpBodyRequest } from '../interfaces/http-requests/IDealHttpBodyRequest';
import { IDealHttpResponse } from '../interfaces/http-responses/IDealHttpResponse';
import { ICards } from '../interfaces/http-responses/ICards'
import { ITurnHttpBodyRequest } from '../interfaces/http-requests/ITurnHttpBodyRequest';
import { ITurnHttpResponse } from '../interfaces/http-responses/ITurnHttpResponse';
import { IStandHttpBodyRequest } from '../interfaces/http-requests/IStandHttpBodyRequest';
import { IStandHttpResponse } from '../interfaces/http-responses/IStandHttpResponse';
import { IErrorHttpResponse } from '../interfaces/http-responses/IErrorHttpResponse';

@Injectable({
  providedIn: 'root'
})
export class PlayerService implements IPlayer {
  initialAmountBalanceArray: number[] = [10, 25, 50, 100, 250, 500, 1000];


  private _balance: number = 0;
  private _balance$ = new BehaviorSubject(this._balance);
  public balance$ = this._balance$.asObservable();

  private _sitResponse: ISitHttpResponse = { availableBetOptions: [], sessionId: '' };
  private _sitResponse$ = new BehaviorSubject(this._sitResponse);
  public sitResponse$ = this._sitResponse$.asObservable();

  private _dealResponse: IDealHttpResponse = { dealerCards: [], playerCards: [], roundEnded: false, winAmount: 0, currentBalance: this._balance };
  private _dealResponse$ = new BehaviorSubject(this._dealResponse);
  public dealResponse$ = this._dealResponse$.asObservable();

  private _turnResponse: ITurnHttpResponse = { dealerCards: [], playerCard: { rank: '', suite: '' }, roundEnded: false, winAmount: 0, currentBalance: this._balance };
  private _turnResponse$ = new BehaviorSubject(this._turnResponse);
  public turnResponse = this._turnResponse$.asObservable();

  private _standResponse: IStandHttpResponse = { roundsPlayed: 0, winAmount: 0 };
  private _standResponse$ = new BehaviorSubject(this._standResponse);
  public standResponse = this._standResponse$.asObservable();

 


  constructor(private _backendService: BackendService, private _randomService: RandomService) {
    this._balance = _randomService.setRandomInitialAmount(this.initialAmountBalanceArray);
    this._balance$.next(this._balance);
  }

  checkIfCardIsNull(card: ICards | null, cardsArray: ICards[]): ICards[] {
    if (card) {
      if (card.rank !== '' && card.suite !== '') {
        cardsArray.push(card)
      }
    }
    return cardsArray;
  }

  clearSession() {
    this._sitResponse$.next({availableBetOptions: [], sessionId: '' })
  }

  sit(balance: ISitHttpBodyRequest): void {
    this._backendService.sitHttpPost(balance).subscribe(result => this._sitResponse$.next(this._sitResponse = result));
  }

  deal(bet: IDealHttpBodyRequest): void {
    this._backendService.dealHttpPost(bet).subscribe(result => this._dealResponse$.next(this._dealResponse = result));
  }

  turn(action: ITurnHttpBodyRequest): void {
    this._backendService.turnHttpPost(action).subscribe(result =>  this._turnResponse$.next(this._turnResponse = result));
  }

  stand(sessionId: IStandHttpBodyRequest): void {    
    this._backendService.standHttpPost(sessionId).subscribe(result =>  this._standResponse$.next(this._standResponse = result));    
  }

}
