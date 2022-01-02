import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth-guard.guard';
import { AdminAuthGuard } from './helpers/admin-auth-guard.guard';

import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { ViewPrintersComponent } from './components/view-printers/view-printers.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'homePage',
    canActivate: [AuthGuard],
    component: HomePageComponent,
  },
  {
    path: 'allUsers',
    canActivate: [AdminAuthGuard],
    component: ViewUsersComponent,
  },
  {
    path: 'allPrinters',
    canActivate: [AdminAuthGuard],
    component: ViewPrintersComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: UserProfileComponent,
  },
  {
    path: 'fileManagement',
    canActivate: [AuthGuard],
    component: UploaderComponent,
  },
  { path: '**', redirectTo: '' },
];
// { path: 'register', component: RegisterComponent },

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
