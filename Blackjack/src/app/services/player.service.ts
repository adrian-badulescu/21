import { Injectable } from '@angular/core';
import { IPlayer, IPlayerObject } from '../interfaces/IPlayer';
import { BackendService } from './backend.service';
import { RandomService } from './random.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService implements IPlayer {
  initialAmountBalanceArray: number[] = [10, 25, 50, 100, 250, 500, 1000];
  balance: number = 0;
  availableBetOptions: number[] = [];

  
  constructor(private _backendService: BackendService, private _randomService: RandomService) { 
    this.balance = _randomService.setRandomInitialAmount(this.initialAmountBalanceArray);
  }

  sit(balance: number) {
    this._backendService.sitHttpPost(balance).subscribe(x => console.log(x))
  }

  deal() {

  }

  turn() {

  }

  stand() {

  }



}
