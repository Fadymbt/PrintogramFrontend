import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { PrinterService } from 'src/app/service/printer.service';

@Component({
  selector: 'app-view-users-access',
  templateUrl: './view-users-access.component.html',
  styleUrls: ['./view-users-access.component.css']
})
export class ViewUsersAccessComponent implements OnInit {
  printersAccessTrue;
  printersAccessFalse;
  searchInput: string = "";

  @Input() selectedUser: User;

  constructor(private printerService: PrinterService) { }

  ngOnInit(): void {
    this.getPrinters();
  }

  getPrinters() {
    this.printerService.getOtherUserPrinters(this.selectedUser._id).subscribe(
      (res)=> {
        this.printersAccessTrue = res;
        console.log(this.printersAccessTrue);
      }, 
      (error: any) => {
        console.log(error);
      }
    );

    this.printerService.getOtherUserOtherPrinters(this.selectedUser._id).subscribe(
      (res)=> {
        this.printersAccessFalse = res;
      }, 
      (error: any) => {
        console.log(error);
      }
    );    
  }

  giveAccess(printer) {
    this.printerService.addUserToPrinter(this.selectedUser._id, printer._id).subscribe(
      (res) => {
        this.getPrinters();
      },
      (error) => {
        this.getPrinters();
        console.log(error);
      }
    );
  }

  removeAccess(printer) {
    this.printerService.removeUserFromPrinter(this.selectedUser._id, printer._id).subscribe(
      (res) => {
        this.getPrinters();
      },
      (error) => {
        this.getPrinters();
        console.log(error);
      }
    );
  }

  comparePrinterToInput(printer) {
    let stringA: string = printer.name.toLowerCase().trim();
    let stringB: string = this.searchInput.toLowerCase().trim();
    if(stringA.match(stringB) != null) {
      return true;
    }
    return false;
  }
}
