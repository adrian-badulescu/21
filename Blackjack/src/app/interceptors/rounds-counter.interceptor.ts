import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CounterService } from '../services/counter.service'

@Injectable()
export class RoundsCounterInterceptor implements HttpInterceptor {

  constructor(private roundCounter: CounterService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {    
    return next.handle(request).pipe(tap(evt => {
      if (evt instanceof HttpResponse) {        
          console.log(evt.body.roundEnded)
          this.roundCounter.increment(evt.body.roundEnded);        
      }
    }));
  }
}
