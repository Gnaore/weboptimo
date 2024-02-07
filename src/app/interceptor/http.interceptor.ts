import { Injectable, inject } from '@angular/core';
import * as http from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';

@Injectable()
export class HttpInterceptor implements http.HttpInterceptor {

  constructor() { }

  intercept(request: http.HttpRequest<unknown>, next: http.HttpHandler): Observable<http.HttpEvent<unknown>> {
    const config = inject(ConfigService);

    if (request.url.includes('/login')) {
      return next.handle(request);
    }
    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${config.getAuthToken()}`
      }
    });
    return next.handle(authReq);
  }
}
