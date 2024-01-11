import { Injectable } from '@angular/core';
import { User, UserManager, UserManagerSettings } from 'oidc-client-ts';
import { BehaviorSubject, Observable, filter, from, map, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OidcAuthService {

  userManager: UserManager;

  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this._isAuthenticated.asObservable();

  constructor() {

    const defaultSettings: UserManagerSettings = {
      authority: 'https://dev.geotab.auth0app.com',
      client_id: 'klYw7yW2QApN1adqafPpUyjt3X0teOhs',
      redirect_uri: 'http://localhost:4200/signin-callback',
      post_logout_redirect_uri: 'http://localhost:4200/login',
      response_type: 'code',
      scope: 'openid profile email http://localhost:5000',
      metadata:{
        issuer: 'https://dev.geotab.auth0app.com',
        token_endpoint: 'https://dev.geotab.auth0app.com/oauth/token',
        authorization_endpoint: 'https://dev.geotab.auth0app.com/authorize',
        userinfo_endpoint: 'https://dev.geotab.auth0app.com/userinfo',
        end_session_endpoint: 'https://dev.geotab.auth0app.com/v2/logout?client_id=klYw7yW2QApN1adqafPpUyjt3X0teOhs&returnTo=http://localhost:4200/login'
      }
    };
    this.userManager = new UserManager(defaultSettings);
  }

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

  public getAccessToken(): Observable<string>{
    return from(this.userManager.getUser()).pipe(
        map((user: User | null) => {
            return user && user.access_token ? user.access_token : '';
        })
    );
  }

  public getUser(): Promise<User|null> {
    return this.userManager?.getUser();
  }

  public login(): Promise<void> {
    return this.userManager?.signinRedirect();
  }

  public renewToken(): Promise<User | null> {
    return this.userManager?.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager?.signoutRedirect();
  }

}
