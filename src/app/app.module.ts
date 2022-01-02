import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { JwtInterceptor } from './helpers/jwt-interceptor';
import { ErrorInterceptor } from './helpers/http-error-interceptor';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { ChangePasswordComponent } from './components/authentication/change-password/change-password.component';
import { environment } from 'src/environments/environment';
import { DropzoneDirective } from './directives/dropzone.directive';
import { UploaderComponent } from './components/uploader/uploader.component';
import { UploadTaskComponent } from './components/upload-task/upload-task.component';
import { GcodeRendererComponent } from './components/gcode-renderer/gcode-renderer.component';
import { FilesPreviewComponent } from './components/files-preview/files-preview.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { StatusComponent } from './components/status/status.component';
import { FilesDialogComponent } from './components/dialogs/files-dialog/files-dialog.component';
import { GcodePreviewerDialogComponent } from './components/dialogs/gcode-previewer-dialog/gcode-previewer-dialog.component';
import { ProfileStatusComponent } from './components/profile-status/profile-status.component';
import { CommentComponent } from './components/comment/comment.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ViewUsersAccessComponent } from './components/view-users-access/view-users-access.component';
import { ViewUsersInfoComponent } from './components/view-users-info/view-users-info.component';
import { MatMenuModule } from '@angular/material/menu';
import { AddUserDialogComponent } from './components/dialogs/add-user-dialog/add-user-dialog.component';
import { ViewUsersDeleteComponent } from './components/view-users-delete/view-users-delete.component';
import { ViewPrintersComponent } from './components/view-printers/view-printers.component';
import { ViewPrintersInfoComponent } from './components/view-printers-info/view-printers-info.component';
import { ViewPrintersAccessComponent } from './components/view-printers-access/view-printers-access.component';
import { ViewPrintersAssignmentsComponent } from './components/view-printers-assignments/view-printers-assignments.component';
import { ViewPrintersAddComponent } from './components/view-printers-add/view-printers-add.component';
import { ViewPrintersDeleteComponent } from './components/view-printers-delete/view-printers-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    ViewUsersComponent,
    ChangePasswordComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    GcodeRendererComponent,
    FilesPreviewComponent,
    HomePageComponent,
    StatusComponent,
    FilesDialogComponent,
    GcodePreviewerDialogComponent,
    ProfileStatusComponent,
    CommentComponent,
    ViewUsersAccessComponent,
    ViewUsersInfoComponent,
    AddUserDialogComponent,
    ViewUsersDeleteComponent,
    ViewPrintersComponent,
    ViewPrintersInfoComponent,
    ViewPrintersAccessComponent,
    ViewPrintersAssignmentsComponent,
    ViewPrintersAddComponent,
    ViewPrintersDeleteComponent,
  ],
  entryComponents: [FilesDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    ScrollingModule,
    MatExpansionModule,
    MatMenuModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
