import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentService } from 'src/app/service/comment.service';
import { FileService } from 'src/app/service/file.service';
import { GcodePreviewerDialogComponent } from '../dialogs/gcode-previewer-dialog/gcode-previewer-dialog.component';
import { AuthenticationService } from '../../service/authentication-service.service';
import { StatusService } from 'src/app/service/status.service';
import { HomePageComponent } from '../home-page/home-page.component';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent implements OnInit {
  @Input() status: any;
  @Input() index: number;
  @Output() gcode: string;
  @Output() comment: any;
  emptyText = '';
  isLiked: boolean = false;
  numberOfLikes: number;
  comments: any;
  commentsSize: number;
  expand: boolean = false;
  showComments: boolean = false;
  commentContent: string;
  previewModelLoading = false;

  constructor(
    private gcodePreviewDialog: MatDialog,
    private fileService: FileService,
    private commentService: CommentService,
    private statusService: StatusService,
    private authenticationService: AuthenticationService,
    private homePageComponent: HomePageComponent
  ) {}

  ngOnInit(): void {
    this.getStatusComments();
    this.gcode = '';
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

  getDate(timePosted) {
    let startTime = new Date(timePosted);
    startTime = new Date(startTime.getTime());
    const month = startTime.toLocaleString('default', { month: 'long' });
    return month + ' ' + startTime.getDate() + ', ' + startTime.getFullYear();
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

  addComment() {
    if (/^\s*$/.test(this.commentContent) || this.commentContent === '') {
      this.emptyText = 'You must write something first...!';
      this.commentContent = '';
    } else {
      this.commentService
        .addComment(this.status.status._id, this.commentContent)
        .subscribe(
          (res) => {
            this.getStatusComments();
            this.commentContent = '';
          },
          (error) => {
            console.log(error);
            this.emptyText = 'You must write something first...!';
            this.commentContent = '';
          }
        );
    }
    this.commentContent = '';
  }

  getStatusComments() {
    this.commentService.getStatusComments(this.status.status._id).subscribe(
      (res) => {
        this.comments = res;
        this.commentsSize = this.comments.length;
        if (this.status.status.liked_by !== undefined) {
          this.numberOfLikes = this.status.status.liked_by.length;
          if (
            this.status.status.liked_by.includes(
              this.authenticationService.getUserID()
            )
          ) {
            this.isLiked = true;
          } else {
            this.isLiked = false;
          }
        } else {
          this.numberOfLikes = 0;
          this.isLiked = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  likeDislikeStatus() {
    this.isLiked ? this.dislikeStatus() : this.likeStatus();
  }

  likeStatus() {
    this.statusService.likeStatus(this.status.status._id).subscribe(
      (res) => {
        this.isLiked = true;
        console.log(res);
        this.homePageComponent.getAllStatuses();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  dislikeStatus() {
    this.statusService.dislikeStatus(this.status.status._id).subscribe(
      (res) => {
        this.isLiked = false;
        console.log(res);
        this.homePageComponent.getAllStatuses();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  FadeOutEmptyText() {
    setTimeout(() => {
      this.emptyText = '';
    }, 4000);
    return '';
  }
}
