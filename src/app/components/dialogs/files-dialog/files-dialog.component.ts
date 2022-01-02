import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication-service.service';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-files-dialog',
  templateUrl: './files-dialog.component.html',
  styleUrls: ['./files-dialog.component.css'],
})
export class FilesDialogComponent implements OnInit {
  files: any = [];
  constructor(
    private fileService: FileService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles() {
    this.fileService.getFiles().subscribe(
      (res) => {
        this.files = res;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  selectFile(file: any) {}

  getDate(timePosted) {
    let startTime = new Date(timePosted);
    startTime = new Date(startTime.getTime());
    const month = startTime.toLocaleString('default', { month: 'long' });
    return month + ' ' + startTime.getDate() + ', ' + startTime.getFullYear();
  }
}
