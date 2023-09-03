import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {
  

  constructor() { }

  setRandomInitialAmount(arr: number[]): number {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

}
