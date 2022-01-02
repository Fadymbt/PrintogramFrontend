import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication-service.service';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  addPrinter(printer_name: any) {
    return this.http.post(`${environment.base_url}/printer/addPrinter`, {
      printer_name: printer_name,
    });
  }

  deletePrinter(_id: any) {
    return this.http.post(`${environment.base_url}/printer/deletePrinter`, {
      printer_id: _id,
    });
  }

  getPrinter(_id: any) {
    return this.http.get(`${environment.base_url}/printer/getPrinter/${_id}`);
  }

  getPrinters() {
    return this.http.get(`${environment.base_url}/printer/getPrinters`);
  }

  getUserPrinters() {
    return this.http.get(`${environment.base_url}/printer/getUserPrinters`);
  }

  getOtherUserPrinters(user_id: any) {
    return this.http.get(
      `${environment.base_url}/printer/getOtherUserPrinters/${user_id}`
    );
  }

  getOtherUserOtherPrinters(user_id: any) {
    return this.http.get(
      `${environment.base_url}/printer/getOtherUserOtherPrinters/${user_id}`
    );
  }

  addUserToPrinter(user_id: any, printer_id: any) {
    return this.http.post(`${environment.base_url}/printer/addUserToPrinter`, {
      user_id,
      printer_id,
    });
  }

  removeUserFromPrinter(user_id: any, printer_id: any) {
    return this.http.post(
      `${environment.base_url}/printer/removeUserFromPrinter`,
      {
        user_id,
        printer_id,
      }
    );
  }

  addPrint(printer_id: any, file_name: any) {
    return this.http.post(`${environment.base_url}/printer/addPrint`, {
      printer_id,
      file_name,
    });
  }

  getAllPrints() {
    return this.http.get(
      `${environment.base_url}/printer/getAllPrints`
      );
  }

  getPrinterPrints(printer_id: any) {
    return this.http.get(
      `${environment.base_url}/printer/getPrinterPrints/${printer_id}`
      );
  }

  getUserPrints() {
    return this.http.get(
      `${environment.base_url}/printer/getUserPrints`
      );
  }
}
