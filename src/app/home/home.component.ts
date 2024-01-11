import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../services/identity.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private identityService: IdentityService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.identityService.isAuthenticated$.subscribe(result => {
      console.log(result);
    })
  }

  logout(): void {
    this.identityService.logout();
  }

  // Sample API call; this call would not succeed, just created to observe the request headers
  callApi(): void {
    // /test/v1/getUser /test/v1/getUser
    this.httpClient.get('/api/v1/getUser').subscribe(result => {
      console.log(result);
    });
  }

}
