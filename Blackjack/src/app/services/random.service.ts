import { Injectable } from '@angular/core';
import { ISitHttpBodyRequest } from '../interfaces/http-requests/ISitHttpBodyRequest';

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
