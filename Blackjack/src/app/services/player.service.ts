import { Injectable } from '@angular/core';
import { IPlayer } from '../interfaces/IPlayer';
import { BackendService } from './backend.service';
import { RandomService } from './random.service';
import { ISitHttpBodyRequest } from '../interfaces/http-requests/ISitHttpBodyRequest';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ISitHttpResponse } from '../interfaces/http-responses/ISitHttpResponse';
import { IDealHttpBodyRequest } from '../interfaces/http-requests/IDealHttpBodyRequest';

@Injectable({
  providedIn: 'root'
})
export class PlayerService implements IPlayer {
  initialAmountBalanceArray: number[] = [10, 25, 50, 100, 250, 500, 1000];
  private _balance: number = 0;
  private _balance$ = new BehaviorSubject(this._balance);
  balance$ = this._balance$.asObservable();
  
  private _sitResponse: ISitHttpResponse = {availableBetOptions: [], sessionId: ''};
  private _sitResponse$ = new BehaviorSubject(this._sitResponse);
  sitResponse$ = this._sitResponse$.asObservable();


  
  constructor(private _backendService: BackendService, private _randomService: RandomService) { 
    this._balance = _randomService.setRandomInitialAmount(this.initialAmountBalanceArray);
    this._balance$.next(this._balance);    
  }
 

  sit(balance: ISitHttpBodyRequest): void {
    this._backendService.sitHttpPost(balance).subscribe(result => this._sitResponse$.next(this._sitResponse = result));    
  }

  deal(bet: IDealHttpBodyRequest): void { 
    console.log(bet);
       
    this._backendService.dealHttpPost(bet).subscribe(result => console.log(result));    
  }

  turn() {

  }

  stand() {

  }



}
