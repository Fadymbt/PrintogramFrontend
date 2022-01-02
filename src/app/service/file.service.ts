import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication-service.service';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  saveDownloadURL(original_name: any, file_name: any, download_url: any) {
    const _id = this.authenticationService.getUserID();
    return this.http.post(`${environment.base_url}/file/saveDownloadURL`, {
      _id,
      file_name,
      original_name,
      download_url,
    });
  }

  downloadFile(file_name: String) {
    return this.http.post(
      `${environment.base_url}/file/downloadFile`,
      { file_name },
      {
        responseType: 'blob',
      }
    );
  }

  deleteFile(file: any) {
    return this.http.post(`${environment.base_url}/file/deleteFile`, {
      file,
    });
  }

  getFiles() {
    return this.http.get(`${environment.base_url}/file/getFiles`);
  }

  getFileAsString(_id: String) {
    return this.http.post<any>(`${environment.base_url}/file/getFileAsString`, {
      _id,
    });
  }
}
