import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcAuthService } from '../services/oidc-auth.service';

@Component({
  selector: 'app-signin-callback',
  templateUrl: './signin-callback.component.html',
  styleUrls: ['./signin-callback.component.css']
})
export class SigninCallbackComponent implements OnInit {

  constructor(private readonly router: Router, private readonly oidcAuthService: OidcAuthService) { }

  async ngOnInit() {
    await this.oidcAuthService.userManager?.signinCallback();
    this.router.navigate(['']);
  }

}
