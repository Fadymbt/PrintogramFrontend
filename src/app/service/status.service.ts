import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication-service.service';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  addStatus(data: any) {
    let requestData = {
      data: data,
    };
    return this.http.post(
      `${environment.base_url}/status/addStatus`,
      requestData
    );
  }

  getAllStatuses() {
    return this.http.get(`${environment.base_url}/status/getAllStatuses`);
  }

  getUserStatuses() {
    return this.http.get(`${environment.base_url}/status/getUserStatuses`);
  }

  deleteStatus(_id: string) {
    let requestData = { _id: _id };
    return this.http.post(
      `${environment.base_url}/status/deleteStatus`,
      requestData
    );
  }

  likeStatus(_id: string) {
    return this.http.post(`${environment.base_url}/status/likeStatus`, {
      status_id: _id,
    });
  }

  dislikeStatus(_id: string) {
    return this.http.post(`${environment.base_url}/status/dislikeStatus`, {
      status_id: _id,
    });
  }
}
