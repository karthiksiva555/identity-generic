import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private identityService: IdentityService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.identityService.login();
  }
}
