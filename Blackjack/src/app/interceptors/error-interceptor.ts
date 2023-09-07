import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { ErrorService } from '../services/error-service'
import { IErrorHttpResponse } from '../interfaces/http-responses/IErrorHttpResponse'

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor {

  constructor(private errorService: ErrorService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap(evt => {
      if (evt instanceof HttpResponse) {  
        const body = evt.body;
          if(body.hasOwnProperty('statusCode')) {
            this.errorService.catchHttpError(body)
          }                   
      }
    }, err => {
      console.log(err)
    }))


  }
}
