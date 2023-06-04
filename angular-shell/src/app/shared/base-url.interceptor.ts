import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_URL} from "../consts";

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      let url = request.url;
      let setHeaders = {};
      const token = localStorage.getItem('token')
     if(!request.url.startsWith('http')) {
        url = `${API_URL}${request.url}`
    }

    if (token) {
        setHeaders = {authorization: `Bearer ${token}`
        }
    }

    return next.handle(request.clone({
      url,
      setHeaders
    }));
  }
}
