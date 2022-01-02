import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication-service.service';
import { FileService } from 'src/app/service/file.service';
import { WebGLRenderer } from 'gcode-preview/node_modules/three';
import { MatDialog } from '@angular/material/dialog';
import { GcodePreviewerDialogComponent } from '../dialogs/gcode-previewer-dialog/gcode-previewer-dialog.component';

@Component({
  selector: 'app-files-preview',
  templateUrl: './files-preview.component.html',
  styleUrls: ['./files-preview.component.css'],
})
export class FilesPreviewComponent implements OnInit {
  @Output() gcode: string;
  @Output() refreshFilesOut: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() refreshFilesIn: boolean;
  downloadFiles: any = [];
  previewModelLoading = false;
  deleteSucess = '';
  error = '';

  constructor(
    private fileService: FileService,
    private storage: AngularFireStorage,
    private gcodePreviewDialog: MatDialog,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.gcode = '';
    this.getFiles();
  }

  getFiles() {
    this.fileService.getFiles().subscribe(
      (res) => {
        this.downloadFiles = res;
      },
      (error: any) => {
        this.error = error;
      }
    );
    this.refreshFilesOut.emit(false);
  }

  previewModel(file: any) {
    this.deleteModelContext();
    this.previewModelLoading = true;
    this.fileService.getFileAsString(file._id).subscribe(
      (res) => {
        this.gcode = res.data;
        this.openGCodePreviewerDialog();
        this.previewModelLoading = false;
      },
      (error) => {
        console.log(error);
        this.previewModelLoading = false;
      }
    );
  }

  deleteFile(file) {
    this.deleteModelContext();
    this.storage
      .refFromURL(file.download_url)
      .delete()
      .subscribe(
        (res) => {
          this.fileService.deleteFile(file).subscribe(
            (deleteSucess) => {
              this.deleteSucess = JSON.parse(
                JSON.stringify(deleteSucess)
              ).message;
              this.getFiles();
            },
            (error: any) => {
              this.error = error;
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteModelContext() {
    let canvas = <HTMLCanvasElement>(
      document.getElementById('gcode-renderer-canvas')
    );
    if (canvas !== null) {
      console.log(canvas);
      let gl = canvas.getContext('webgl');
      gl.getExtension('WEBGL_lose_context').loseContext();
    }
  }

  openGCodePreviewerDialog() {
    let gcodePreviewDialogRef = this.gcodePreviewDialog.open(
      GcodePreviewerDialogComponent,
      {
        data: this.gcode,
      }
    );

    gcodePreviewDialogRef.beforeClosed().subscribe(() => {
      this.deleteModelContext();
    });
  }

  getDate(timePosted) {
    let startTime = new Date(timePosted);
    startTime = new Date(startTime.getTime());
    const month = startTime.toLocaleString('default', { month: 'long' });
    return month + ' ' + startTime.getDate() + ', ' + startTime.getFullYear();
  }

  showPreviewButtonText() {
    if (this.previewModelLoading) {
      return '<span *ngIf="previewModelLoading" class="spinner-border spinner-border-sm mr-1"></span>';
    } else {
      return '<i *ngIf="!previewModelLoading" class="fa fa-eye"></i>';
    }
  }

  FadeOutSuccessMsg() {
    setTimeout(() => {
      this.deleteSucess = '';
    }, 4000);
    return '';
  }
}
