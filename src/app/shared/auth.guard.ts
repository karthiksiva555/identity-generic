import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { IdentityService } from '../services/identity.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private identityService: IdentityService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.identityService.isAuthenticated$.pipe(
        switchMap(isAuthenticated => {
          if(isAuthenticated)
            return of(true);
          this.router.navigate(['/login']);
          return of(false);
        })
      );
  }

}
