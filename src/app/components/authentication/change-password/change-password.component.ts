import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {PasswordValidation} from '../../../helpers/password-validation';
import { UserService } from 'src/app/service/user.service';
import { AuthenticationService } from 'src/app/service/authentication-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.changePasswordForm = new FormGroup({
      old_password: new FormControl(''),
      new_password: new FormControl(''),
      confirm_password: new FormControl(''),
    });
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      old_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    },{
      validator: PasswordValidation('new_password', 'confirm_password')
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.changePasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService
      .changePassword(
        this.authenticationService.getUserName(),
        this.f.old_password.value,
        this.f.new_password.value
      )
      .subscribe(
        (res) => {
          if (res !== 'Incorrect password') {
            this.authenticationService.logout();
            this.router.navigate(['login']);
          }
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
