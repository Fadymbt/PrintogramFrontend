import { Component, OnInit, Input } from '@angular/core';
import { PrinterService } from 'src/app/service/printer.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-view-printers-assignments',
  templateUrl: './view-printers-assignments.component.html',
  styleUrls: ['./view-printers-assignments.component.css'],
})
export class ViewPrintersAssignmentsComponent implements OnInit {
  currentPrint = null;
  prints: any = [];
  users = [];
  currentPrintTimePassed = 0;
  currentPrintTimeRemaining = 0;
  currentPrintProgress = '0%';

  @Input() selectedPrinter;

  constructor(
    private userService: UserService,
    private printerService: PrinterService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getPrints() {
    this.printerService.getPrinterPrints(this.selectedPrinter._id).subscribe(
      (res) => {
        this.prints = res;
        if (this.prints.length > 0) {
          this.currentPrint = this.prints[0];
        } else {
          this.currentPrint = null;
        }

        setInterval(
          (function (self) {
            //Self-executing func which takes 'this' as self
            return function () {
              //Return a function in the context of 'self'
              self.updateCurrentPrintStatus(); //Thing you wanted to run as non-window 'this'
            };
          })(this),
          1000 //normal interval, 'this' scope not impacted here.
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (res) => {
        this.users = res;
        this.getPrints();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPrintUser(print) {
    for (let i = 0; i < this.users.length; i++) {
      let user = this.users[i];
      if (print.user_id == user._id) {
        return user;
      }
    }
  }

  getPrintUserPic(print) {
    let user = this.getPrintUser(print);
    let defaultPic = 'src/assets/images/default.jpeg';
    if (user.profile_picture !== undefined) {
      return user.profile_picture;
    }
    return defaultPic;
  }

  updateCurrentPrintStatus() {
    let now = new Date().getTime();
    let start = this.currentPrint.print_start_time;
    let end = this.currentPrint.print_end_time;

    this.currentPrintTimePassed = now - start;
    this.currentPrintTimeRemaining = end - now;
    if (Math.floor(((now - start) / (end - start)) * 100) >= 100) {
      this.currentPrintProgress = 100 + '%';
    } else {
      this.currentPrintProgress =
        Math.floor(((now - start) / (end - start)) * 100) + '%';
    }
  }

  getPrintProgress() {
    return '25%';
  }

  debug() {
    console.log(this.prints);
  }
}
