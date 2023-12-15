import { Injectable } from '@angular/core';
import { User, UserManager, UserManagerSettings } from 'oidc-client-ts';
import { BehaviorSubject, Observable, filter, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OidcAuthService {

  userManager: UserManager | undefined;

  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this._isAuthenticated.asObservable();

  constructor() { }

  initialize(settings: UserManagerSettings){
    this.userManager = new UserManager(settings);
    this.isUserAuthenticated();
  }

  public isUserAuthenticated() {
    this.userManager?.getUser().then(user => {
      const loggedIn = !!user && !user.expired;
      this._isAuthenticated.next(loggedIn);
    }).catch(_ => {
      this._isAuthenticated.next(false);
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated$.pipe(
      filter((value) => value !== undefined),
      take(1)
    );
  }

  public getUser(): Promise<User|null> | undefined {
    return this.userManager?.getUser();
  }

  public login(): Promise<void> | undefined {
    return this.userManager?.signinRedirect();
  }

  public renewToken(): Promise<User | null> | undefined {
    return this.userManager?.signinSilent();
  }

  public logout(): Promise<void> | undefined{
    return this.userManager?.signoutRedirect();
  }

}
