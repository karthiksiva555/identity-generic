import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../services/identity.service';
import { AuthService } from '../interfaces/auth-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private identityService: IdentityService) { }

  ngOnInit(): void {
    this.identityService.isAuthenticated$.subscribe(result => {
      console.log(result);
    })
  }

  logout(): void {
    this.identityService.logout();
  }

}
