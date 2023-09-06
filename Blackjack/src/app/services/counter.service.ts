import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  private _count: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {    
  }

  increment(round: any) {    
    console.log(round)
      if(round === true) {
        this._count.next(this._count.value + 1);
      }
    
    return this._count.value;    
  }

  get count() {
    return this._count.asObservable();
  }
}


interface IRequestWithRoundEnded {
  [key:string]: boolean
}