import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication-service.service';
import { StatusService } from 'src/app/service/status.service';
import { FilesDialogComponent } from '../dialogs/files-dialog/files-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  viewMode = 'all-posts';
  statuses: any;
  file: any;
  statusForm: FormGroup;
  returnUrl: string;
  fileName: string = '';
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private filesDialog: MatDialog,
    private formBuilder: FormBuilder,
    private statusService: StatusService,
    private authenticationService: AuthenticationService
  ) {
    this.statusForm = new FormGroup({
      status_content: new FormControl(''),
    });
    this.returnUrl = 'homePage';
  }

  ngOnInit(): void {
    this.getAllStatuses();
    this.statusForm = this.formBuilder.group({
      status_content: ['', Validators.required],
    });

    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/homePage';
  }

  get f() {
    return this.statusForm.controls;
  }

  openFilesDialog() {
    let filesDialogRef = this.filesDialog.open(FilesDialogComponent);

    filesDialogRef.afterClosed().subscribe((file) => {
      this.file = file;
      this.fileName = this.file.original_name;
    });
  }

  removeFile() {
    this.file = undefined;
    this.fileName = '';
  }

  onSubmit() {
    this.submitted = true;
    if (this.statusForm.invalid) {
      return;
    }

    let data;
    if (this.file !== undefined) {
      data = { content: this.f.status_content.value, file_id: this.file._id };
    } else {
      data = { content: this.f.status_content.value };
    }
    console.log(data);

    this.statusService.addStatus(data).subscribe(
      (res) => {
        this.file = undefined;
        this.submitted = false;
        this.statusForm.reset();
        this.getAllStatuses();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllStatuses() {
    this.statusService.getAllStatuses().subscribe(
      (res) => {
        this.statuses = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getFirstName() {
    return this.authenticationService.getFirstName();
  }

  refreshStatuses($event) {
    this.getAllStatuses();
  }
}
