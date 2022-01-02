import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MEANStackFrontend';

  LoginStatus$: Observable<boolean>;
  constructor(
    private router: Router,
    private authentication: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.LoginStatus$ = this.authentication.isLoggedAsObservable();
    console.log(this.LoginStatus$);
  }
}
