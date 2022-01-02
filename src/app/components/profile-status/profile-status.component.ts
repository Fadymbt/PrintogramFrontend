import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileService } from 'src/app/service/file.service';
import { StatusService } from 'src/app/service/status.service';
import { GcodePreviewerDialogComponent } from '../dialogs/gcode-previewer-dialog/gcode-previewer-dialog.component';

@Component({
  selector: 'app-profile-status',
  templateUrl: './profile-status.component.html',
  styleUrls: ['./profile-status.component.css'],
})
export class ProfileStatusComponent implements OnInit {
  @Output() gcode: string;
  @Output() refreshStatuses = new EventEmitter<string>();
  statuses: any = [];
  expand: boolean = false;
  previewModelLoading = false;
  deleteSucess = '';

  constructor(
    private statusService: StatusService,
    private gcodePreviewDialog: MatDialog,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.getUserStatuses();
  }

  getUserStatuses() {
    this.statusService.getUserStatuses().subscribe(
      (res) => {
        this.statuses = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  previewModel(_id: any) {
    this.deleteModelContext();
    this.previewModelLoading = true;
    this.fileService.getFileAsString(_id).subscribe(
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

  showPreviewButtonText() {
    if (this.previewModelLoading) {
      return '<span *ngIf="previewModelLoading" class="spinner-border spinner-border-sm mr-1"></span>Loading...';
    } else {
      return '<i *ngIf="!previewModelLoading" class="fa fa-eye"></i> Preview';
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

  deleteStatus(_id: string) {
    this.statusService.deleteStatus(_id).subscribe(
      (deleteSucess) => {
        this.deleteSucess = JSON.parse(JSON.stringify(deleteSucess)).message;
        this.getUserStatuses();
        this.refreshParentStatuses();
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

  refreshParentStatuses() {
    this.refreshStatuses.emit('refresh');
  }

  getDate(timePosted) {
    let startTime = new Date(timePosted);
    startTime = new Date(startTime.getTime());
    const month = startTime.toLocaleString('default', { month: 'long' });
    return month + ' ' + startTime.getDate() + ', ' + startTime.getFullYear();
  }

  FadeOutSuccessMsg() {
    setTimeout(() => {
      this.deleteSucess = '';
    }, 4000);
    return '';
  }
}
