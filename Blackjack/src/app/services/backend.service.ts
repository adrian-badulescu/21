import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayerService } from './player.service';
import { IPlayer } from '../interfaces/IPlayer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  baseUrl: string = 'https://blackjack.fuzz.me.uk';
  sitEndpoint: string  = 'sit'
  dealEndpoint: string  = 'deal'
  turnEndpoint: string  = 'turn'
  standEndpoint: string  = 'stand'
  
  constructor(private _http: HttpClient) {
    
  }

  sitHttpPost(balance: number): Observable<any> {
    return this._http.post(`${this.baseUrl}/${this.sitEndpoint}`, balance)
  }

  dealHttpPost() {
    
  }
}
