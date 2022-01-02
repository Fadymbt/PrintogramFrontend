import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post(`${environment.base_url}/user/register`, user);
  }

  getUsers() {
    return this.http.get<User[]>(`${environment.base_url}/user/getUsers`);
  }

  deleteUser(user: User) {
    return this.http.post(`${environment.base_url}/user/deleteUser`, user, {
      responseType: 'json',
    });
  }

  updateUserProfilePicture(profile_picture: any) {
    return this.http.put(
      `${environment.base_url}/user/updateUserProfilePicture`,
      { profile_picture: profile_picture },
      { responseType: 'json' }
    );
  }

  changePassword(
    user_name: String,
    old_password: String,
    new_password: String
  ) {
    return this.http.put(`${environment.base_url}/user/changePassword`, {
      user_name,
      old_password,
      new_password,
    });
  }

  updateUserFirstName(user_id: String, first_name: String) {
    return this.http.put(`${environment.base_url}/user/updateUserFirstName`, {
      user_id,
      first_name,
    });
  }

  updateUserLastName(user_id: String, last_name: String) {
    return this.http.put(`${environment.base_url}/user/updateUserLastName`, {
      user_id,
      last_name,
    });
  }

  updateUserEmail(user_id: String, email: String) {
    return this.http.put(`${environment.base_url}/user/updateUserEmail`, {
      user_id,
      email,
    });
  }

  updateUserAccessRights(user_id: String, is_admin: Boolean) {
    return this.http.put(
      `${environment.base_url}/user/updateUserAccessRights`,
      {
        user_id,
        is_admin,
      }
    );
  }
}
