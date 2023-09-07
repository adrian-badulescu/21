import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,  EMPTY } from 'rxjs';
import { IErrorHttpResponse } from '../interfaces/http-responses/IErrorHttpResponse';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _httpError: boolean = false;
  private _httpError$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public httpError = this._httpError$.asObservable();
  
  private _err$: BehaviorSubject<IErrorHttpResponse> = new BehaviorSubject({statusCode: 0, error: '', message: ''});
  public err = this._err$.asObservable();
  constructor() { }

  catchHttpError(err: IErrorHttpResponse): Observable<any> {
    if(err.statusCode != 0) {   
      console.log(err)   
      this._httpError = true;
      this._httpError$.next(this._httpError);
      this._err$.next(err);
    }
    return EMPTY;
  }

  clearError() {
    return this._httpError$.next(this._httpError = false);
  }

}
