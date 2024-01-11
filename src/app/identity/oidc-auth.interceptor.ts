import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { OidcAuthService } from '../services/oidc-auth.service';

@Injectable()
export class OidcAuthInterceptor implements HttpInterceptor {

  constructor(private oidcAuthService: OidcAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(!this.isUrlWhitelisted(request.url))
        return next.handle(request);

    return from(this.oidcAuthService.getAccessToken()).pipe(
      switchMap((accessToken) => {
          if(accessToken){
            const authRequest = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + accessToken)
            });
            return next.handle(authRequest);
          }
          return next.handle(request);
        })
  );

  }

  isUrlWhitelisted(url: string){
    url = url.toLowerCase();
    if (url.includes('/api/v2/')) {
        return true;
    }
    if (url.includes('/api/v1/')) {
        if (url.includes('/authenticate')) {
            return url.includes('/iamsession');
        }
        return true;
    }
    return false;
}
}
