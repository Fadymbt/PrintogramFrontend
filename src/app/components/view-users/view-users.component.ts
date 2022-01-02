import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/service/authentication-service.service';
import { UserService } from 'src/app/service/user.service';
import { AddUserDialogComponent } from '../dialogs/add-user-dialog/add-user-dialog.component';
import { ViewUsersDeleteComponent } from '../view-users-delete/view-users-delete.component';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent implements OnInit {
  users: User[] = [];
  selectedUser = null;
  searchInputUsers = '';
  deleteSucess = '';
  error = '';
  submenuInfoSelected = true;
  submenuAccessSelected = false;

  constructor(
    private userService: UserService,
    private addUserDialog: MatDialog,
    private authenticationService: AuthenticationService,
    private deleteUserDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authenticationService.currentUser;
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (res) => {
        this.users = res;
        this.OnSelectUser(this.users[0]);
      },
      (error: any) => {
        this.error = error;
      }
    );
  }

  openDeleteUserDialog() {
    this.deleteUserDialog
      .open(ViewUsersDeleteComponent, { data: this.selectedUser })
      .afterClosed()
      .subscribe((result) => {
        if (result == 'delete') this.deleteUser(this.selectedUser);
      });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(
      (deleteSucess) => {
        this.deleteSucess = JSON.parse(JSON.stringify(deleteSucess)).message;
        this.getUsers();
      },
      (error: any) => {
        this.error = error;
      }
    );
  }

  getUserProfilePicSrc(user: User) {
    let defaultPic = '../../../assets/images/default.jpeg';
    if (user.profile_picture !== undefined) {
      return user.profile_picture;
    }
    return defaultPic;
  }

  FadeOutSuccessMsg() {
    setTimeout(() => {
      this.deleteSucess = '';
    }, 4000);
    return '';
  }

  CompareUserToSearchInput(user: User) {
    let fullName = (user.first_name + ' ' + user.last_name).toLowerCase();
    let email = user.email.toLowerCase();
    let input = this.searchInputUsers.toLowerCase().trim();

    if (fullName.match(input) != null) {
      return true;
    }
    if (email.match(input) != null) {
      return true;
    }
    return false;
  }

  openAddUserDialog() {
    let filesDialogRef = this.addUserDialog.open(AddUserDialogComponent);

    filesDialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  OnSelectUser(user: User) {
    this.selectedUser = user;
  }

  private DiselectAllSubmenus() {
    this.submenuAccessSelected = false;
    this.submenuInfoSelected = false;
  }

  OnSelectSubmenuInfo() {
    this.DiselectAllSubmenus();
    this.submenuInfoSelected = true;
  }

  OnSelectSubmenuAccess() {
    this.DiselectAllSubmenus();
    this.submenuAccessSelected = true;
  }

  refreshUsers() {
    console.log('Hello');
    this.getUsers();
  }
}
