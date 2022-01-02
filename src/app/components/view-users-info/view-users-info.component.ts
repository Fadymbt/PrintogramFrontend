import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-view-users-info',
  templateUrl: './view-users-info.component.html',
  styleUrls: ['./view-users-info.component.css'],
})
export class ViewUsersInfoComponent implements OnInit {
  valueNameFirst: string = '';
  valueNameLast: string = '';
  valueEmail: string = '';
  valueRights: boolean = false;
  editingName = false;
  editingEmail = false;
  editingRights = false;

  @Output() refreshUsers = new EventEmitter<string>();
  @Input() selectedUser: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  getRightsName() {
    if (this.selectedUser.is_admin) {
      return 'Admin';
    }
    return 'User';
  }

  CloseEditingMode() {
    this.editingName = false;
    this.editingEmail = false;
    this.editingRights = false;
  }

  OnEditName() {
    this.CloseEditingMode();
    this.valueNameFirst = this.selectedUser.first_name;
    this.valueNameLast = this.selectedUser.last_name;
    this.editingName = true;
  }

  OnEditNameSave() {
    if (this.valueNameFirst !== this.selectedUser.first_name) {
      this.userService
        .updateUserFirstName(this.selectedUser._id, this.valueNameFirst)
        .subscribe(
          (res) => {
            console.log(res);
            this.refreshParentUsers();
          },
          (error) => {
            console.log(error);
            this.refreshParentUsers();
          }
        );
    }
    if (this.valueNameLast !== this.selectedUser.last_name) {
      this.userService
        .updateUserLastName(this.selectedUser._id, this.valueNameLast)
        .subscribe(
          (res) => {
            console.log(res);
            this.refreshParentUsers();
          },
          (error) => {
            console.log(error);
            this.refreshParentUsers();
          }
        );
    }
    this.CloseEditingMode();
  }

  OnEditEmail() {
    this.valueEmail = this.selectedUser.email;
    this.CloseEditingMode();
    this.editingEmail = true;
  }

  OnEditEmailSave() {
    if (this.valueEmail !== this.selectedUser.email) {
      this.userService
        .updateUserEmail(this.selectedUser._id, this.valueEmail)
        .subscribe(
          (res) => {
            console.log(res);
            this.refreshParentUsers();
          },
          (error) => {
            console.log(error);
            this.refreshParentUsers();
          }
        );
    }
    this.CloseEditingMode();
  }

  OnEditRights() {
    this.valueRights = this.selectedUser.is_admin;
    this.CloseEditingMode();
    this.editingRights = true;
  }

  OnEditRightsSave() {
    if (this.valueRights !== this.selectedUser.is_admin) {
      this.userService
        .updateUserAccessRights(this.selectedUser._id, this.valueRights)
        .subscribe(
          (res) => {
            console.log(res);
            this.refreshParentUsers();
          },
          (error) => {
            console.log(error);
            this.refreshParentUsers();
          }
        );
    }
    console.log(this.valueRights);
    this.CloseEditingMode();
  }

  refreshParentUsers() {
    this.refreshUsers.emit('refresh');
  }
}
