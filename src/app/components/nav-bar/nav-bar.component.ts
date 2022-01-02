import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication-service.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  user: User;
  LoginStatus$: Observable<boolean>;
  AdminStatus$: Observable<boolean>;
  isNavbarCollapsed: boolean = true;
  userProfilePicSrc: string = '../../../assets/images/default.jpeg';

  constructor(
    private router: Router,
    private authentication: AuthenticationService
  ) {}

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
    this.LoginStatus$ = this.authentication.isLoggedAsObservable();
    this.AdminStatus$ = this.authentication.isAdminAsObservable();
    this.user = new User();
    this.user.setter(
      currentUser.first_name,
      currentUser.last_name,
      currentUser.user_name,
      currentUser.email,
      '',
      this.AdminStatus$ ? 'Admin' : 'User',
      currentUser.profile_picture
    );
    this.userProfilePicSrc = this.user.profile_picture;
    if (this.user.profile_picture === undefined) {
      this.userProfilePicSrc = '../../../assets/images/default.jpeg';
    }
  }

  logout() {
    this.authentication.logout();
    this.router.navigate(['login']);
  }

  printOut() {
    console.log(this.isNavbarCollapsed);
  }
}
