import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication-service.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  addComment(status_id: any, content: any) {
    return this.http.post(`${environment.base_url}/comment/addComment`, {
      status_id,
      content,
    });
  }

  getStatusComments(status_id: any) {
    return this.http.get(
      `${environment.base_url}/comment/getStatusComments/${status_id}`
    );
  }
}
