import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private _round: number = 0;
  private _round$: BehaviorSubject<number> = new BehaviorSubject(this._round);
  public round = this._round$.asObservable();

  constructor() {    
  }

  increment(round: any) {    
    console.log(round)
      if(round === true) {
        this._round$.next(this._round$.value + 1);
      }    
    return this._round$.value;    
  }


}


