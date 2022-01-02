import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../authentication/change-password/change-password.component';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import { FileService } from 'src/app/service/file.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User;
  cannotUpload = '';
  profilePicFile: File;
  isShown: boolean = false;
  rejex = /(?:\.([^.]+))?$/;
  AdminStatus$: Observable<boolean>;
  changePasswordString: string = 'Change Password';
  userProfilePicSrc: string = '../../../assets/images/default.jpeg';

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: any;

  constructor(
    private storage: AngularFireStorage,
    private authentication: AuthenticationService,
    private changeDialog: MatDialog,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
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
    console.log(this.user);
    this.userProfilePicSrc = this.user.profile_picture;
    if (this.user.profile_picture === undefined) {
      this.userProfilePicSrc = '../../../assets/images/default.jpeg';
    }
    console.log(this.userProfilePicSrc);
  }

  /* maybe this function is not needed anymore for the dialog pop up, as the button can always display "change password" */
  showChangePassword() {
    this.isShown = !this.isShown;
    this.isShown
      ? (this.changePasswordString = 'Cancel')
      : (this.changePasswordString = 'Change Password');
  }

  openChangeDialog() {
    this.changeDialog.open(ChangePasswordComponent);
  }

  openProfilePicDialog() {
    this.changeDialog.open(ChangePasswordComponent);
    /* yet to be implemented */
  }

  onDrop(file: FileList) {
    let fileCheck = this.rejex.exec(file.item(0).name)[1];
    if (fileCheck === 'png' || fileCheck === 'jpeg' || fileCheck === 'jpg') {
      const fileName = `${this.authenticationService.getUserID()}.${
        this.rejex.exec(file.item(0).name)[1]
      }`;
      const path = `profile_pictures/${fileName}`;
      const firebaseRef = this.storage.ref(path);
      this.profilePicFile = file.item(0);

      this.task = this.storage.upload(path, this.profilePicFile);

      this.percentage = this.task.percentageChanges();

      this.snapshot = this.task.snapshotChanges().pipe(
        tap(console.log),
        // The file's download URL
        finalize(async () => {
          this.downloadURL = await firebaseRef.getDownloadURL().toPromise();

          this.userService
            .updateUserProfilePicture(
              await firebaseRef.getDownloadURL().toPromise()
            )
            .subscribe(
              (res) => {
                this.userProfilePicSrc = JSON.parse(
                  JSON.stringify(res)
                ).profile_picture;
                this.authenticationService.setUserProfilePicture(
                  JSON.parse(JSON.stringify(res)).profile_picture
                );
                this.percentage = null;
                this.snapshot = null;
              },
              (error) => {
                console.log(error);
              }
            );
        })
      );
    } else {
      console.log('nope');
      this.cannotUpload =
        'File format not supported... Please use .png, .jpeg, or .jpg';
    }
  }

  cancel() {
    this.task.cancel();
    this.snapshot = undefined;
  }

  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
