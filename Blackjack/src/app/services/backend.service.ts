import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayerService } from './player.service';
import { IPlayer } from '../interfaces/IPlayer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  baseUrl: string = 'http://127.0.0.1:3000/api';
  endpointSit: string  = 'sit'
  endpointDeal: string  = 'deal'
  endpointTurn: string  = 'turn'
  endpointStand: string  = 'stand'
  
  constructor(private _http: HttpClient) {
    
  }

  sitHttpPost(balance: number): Observable<any> {
    console.log(balance);
    
    return this._http.post(`${this.baseUrl}/${this.endpointSit}`, {"balance": balance})
  }

  dealHttpPost() {
    
  }
}
