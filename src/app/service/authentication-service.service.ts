import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private loginStatus = new BehaviorSubject<boolean>(this.isLoggedIn());
  private adminStatus = new BehaviorSubject<boolean>(this.isAdmin());
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(JSON.stringify(localStorage.getItem('currentUser'))!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user_name: string, password: string) {
    return this.http
      .post<any>(`${environment.base_url}/user/login`, {
        user_name,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.loginStatus.next(true);
          if (user.user.is_admin) {
            this.adminStatus.next(true);
          }
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.loginStatus.next(false);
    this.adminStatus.next(false);
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser') !== null) {
      return true;
    }
    return false;
  }

  isLoggedAsObservable() {
    return this.loginStatus.asObservable();
  }

  isAdmin() {
    if (localStorage.getItem('currentUser') !== null) {
      if (JSON.parse(localStorage.getItem('currentUser')).user.is_admin) {
        return true;
      }
    }
    return false;
  }

  isAdminAsObservable() {
    return this.adminStatus.asObservable();
  }

  getUserObservable() {
    return this.currentUserSubject.asObservable();
  }

  getFirstName() {
    return JSON.parse(localStorage.getItem('currentUser')).user.first_name;
  }

  getUserName() {
    return JSON.parse(localStorage.getItem('currentUser')).user.user_name;
  }

  getUserID() {
    return JSON.parse(localStorage.getItem('currentUser')).user._id;
  }

  getUserToken() {
    return JSON.parse(localStorage.getItem('currentUser')).token;
  }

  setUserProfilePicture(profilePic) {
    let tempUser = JSON.parse(localStorage.getItem('currentUser'));
    tempUser.user.profile_picture = profilePic;
    console.log(tempUser.profile_picture);
    localStorage.setItem('currentUser', JSON.stringify(tempUser));
  }
}
