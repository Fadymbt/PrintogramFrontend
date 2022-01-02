import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-view-users-delete',
  templateUrl: './view-users-delete.component.html',
  styleUrls: ['./view-users-delete.component.css']
})
export class ViewUsersDeleteComponent implements OnInit {
  user: User;

  constructor(@Inject(MAT_DIALOG_DATA) public selectedUser: User/**/) { 
    this.user = selectedUser; 
  }

  ngOnInit(): void {
  }

  getUserProfilePicSrc() {
    let defaultPic = "../../../assets/images/default.jpeg";
    if(this.user.profile_picture !== undefined) {
      return this.user.profile_picture;
    }
    return defaultPic;
  }
}
