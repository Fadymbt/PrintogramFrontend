import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddUserDialogComponent } from '../../dialogs/add-user-dialog/add-user-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private addUserDialogRef: MatDialogRef<RegisterComponent>
  ) {
    this.registerForm = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      user_name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      user_type: new FormControl(''),
    });
    this.returnUrl = 'allUsers';
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      user_name: ['', Validators.required],
      email: [
        '',
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
      password: ['', Validators.required],
      user_type: ['User', Validators.required],
    });

    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/allUsers';
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    let user = new User();
    user.setter(
      this.f.first_name.value,
      this.f.last_name.value,
      this.f.user_name.value,
      this.f.email.value,
      this.f.password.value,
      this.f.user_type.value,
      ''
    );

    this.loading = true;
    this.userService.register(user).subscribe(
      () => {
        this.onClose();
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        if (JSON.stringify(error).includes('User already exists')) {
          this.error =
            'User already Exists, please choose a different Username or email.';
        } else {
          if (!this.registerForm.get('email').valid) {
            this.error = 'Incorrect Email format';
          } else {
            this.error = 'Please fill out the missing fields';
          }
        }
        this.loading = false;
      }
    );

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
  }

  onClose() {
    this.addUserDialogRef.close();
  }
}
