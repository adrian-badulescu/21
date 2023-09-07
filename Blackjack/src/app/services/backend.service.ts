import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayerService } from './player.service';
import { IPlayer } from '../interfaces/IPlayer';
import { Observable } from 'rxjs';
import { ISitHttpResponse } from '../interfaces/http-responses/ISitHttpResponse';
import { IDealHttpResponse } from '../interfaces/http-responses/IDealHttpResponse';
import { ISitHttpBodyRequest } from '../interfaces/http-requests/ISitHttpBodyRequest';
import { IDealHttpBodyRequest } from '../interfaces/http-requests/IDealHttpBodyRequest';
import { ITurnHttpBodyRequest } from '../interfaces/http-requests/ITurnHttpBodyRequest';
import { ITurnHttpResponse } from '../interfaces/http-responses/ITurnHttpResponse';
import { IStandHttpBodyRequest } from '../interfaces/http-requests/IStandHttpBodyRequest';
import { IStandHttpResponse } from '../interfaces/http-responses/IStandHttpResponse';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  baseUrl: string = 'http://127.0.0.1:3000/api';
  endpointSit: string  = 'sit';
  endpointDeal: string  = 'deal';
  endpointTurn: string  = 'turn';
  endpointStand: string  = 'stand';
  
  constructor(private _http: HttpClient) {
    
  }

  sitHttpPost(balance: ISitHttpBodyRequest): Observable<ISitHttpResponse> {    
    return this._http.post<ISitHttpResponse>(`${this.baseUrl}/${this.endpointSit}`, balance);
  }

  dealHttpPost(bet: IDealHttpBodyRequest): Observable<IDealHttpResponse> {
    return this._http.post<IDealHttpResponse>(`${this.baseUrl}/${this.endpointDeal}`, bet);
  }

  turnHttpPost(action: ITurnHttpBodyRequest): Observable<ITurnHttpResponse> {
    return this._http.post<ITurnHttpResponse>(`${this.baseUrl}/${this.endpointTurn}`, action);
  }

  standHttpPost(sessionId: IStandHttpBodyRequest): Observable<IStandHttpResponse> {
    return this._http.post<IStandHttpResponse>(`${this.baseUrl}/${this.endpointStand}`, sessionId);
  }
}
