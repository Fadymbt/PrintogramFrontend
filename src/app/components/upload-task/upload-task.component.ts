import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { FileService } from '../../service/file.service';
import { AuthenticationService } from '../../service/authentication-service.service';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css'],
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;
  @Input() index: number;
  @Output() fileToRemove: EventEmitter<File> = new EventEmitter<File>();

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: any;

  constructor(
    private storage: AngularFireStorage,
    private authenticationService: AuthenticationService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.uploadFile();
  }

  uploadFile() {
    const fileName = `${Date.now()}|${this.file.name}`;
    const path = `${this.authenticationService.getUserID()}/${fileName}`;
    const firebaseRef = this.storage.ref(path);

    this.task = this.storage.upload(path, this.file);

    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await firebaseRef.getDownloadURL().toPromise();

        this.fileService
          .saveDownloadURL(
            this.file.name,
            fileName,
            await firebaseRef.getDownloadURL().toPromise()
          )
          .subscribe(
            (res) => {
              console.log(res);
              this.fileToRemove.emit(this.file);
            },
            (error) => {
              console.log(error);
            }
          );
      })
    );
  }

  cancel() {
    this.task.cancel();
    this.fileToRemove.emit(this.file);
  }

  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
