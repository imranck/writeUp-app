import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   const commonUrl="https://angular-4d5c6-default-rtdb.firebaseio.com/userdata.json"
   request=request.clone({setHeaders:{},url:commonUrl+request.url}) 
   return next.handle(request);
  }
}
