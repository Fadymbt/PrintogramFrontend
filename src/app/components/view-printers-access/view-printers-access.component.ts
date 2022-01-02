import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { PrinterService } from 'src/app/service/printer.service';
import { UserService } from 'src/app/service/user.service';
import { ViewPrintersAddComponent } from '../view-printers-add/view-printers-add.component';

@Component({
  selector: 'app-view-printers-access',
  templateUrl: './view-printers-access.component.html',
  styleUrls: ['./view-printers-access.component.css'],
})
export class ViewPrintersAccessComponent implements OnInit {
  selectedPrinter;
  usersAll: User[];
  usersAccessTrue: User[] = [];
  usersAccessFalse: User[] = [];
  searchInput: string = '';

  @Input() selectedPrinterId;

  constructor(
    private printerService: PrinterService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getPrinter() {
    this.printerService.getPrinter(this.selectedPrinterId).subscribe(
      (res) => {
        this.selectedPrinter = res[0];
        this.sortUsers();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (res) => {
        this.usersAll = res;
        this.getPrinter();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private sortUsers() {
    this.usersAccessTrue = [];
    this.usersAccessFalse = [];
    let userIDs = this.selectedPrinter.access_user_id;
    for (let i = 0; i < this.usersAll.length; i++) {
      let noAccess = true;
      for (let j = 0; j < userIDs.length; j++) {
        if (this.usersAll[i]._id === userIDs[j]) {
          this.usersAccessTrue.push(this.usersAll[i]);
          noAccess = false;
          break;
        }
      }
      if (noAccess) {
        this.usersAccessFalse.push(this.usersAll[i]);
      }
    }
  }

  compareUserToInput(user: User) {
    let stringA: string = (user.first_name + ' ' + user.last_name)
      .toLowerCase()
      .trim();
    let stringB: string = user.email.toLowerCase().trim();
    let stringInput: string = this.searchInput.toLowerCase().trim();
    if (
      stringA.match(stringInput) != null ||
      stringB.match(stringInput) != null
    ) {
      return true;
    }
    return false;
  }

  getUserProfilePicSrc(user: User) {
    let defaultPic = '../../../assets/images/default.jpeg';
    if (user.profile_picture !== undefined) {
      return user.profile_picture;
    }
    return defaultPic;
  }

  giveAccess(user: User) {
    this.printerService
      .addUserToPrinter(user._id, this.selectedPrinter._id)
      .subscribe(
        (res) => {
          this.getPrinter();
        },
        (error) => {
          console.log(error);
          this.getUsers();
        }
      );
  }

  removeAccess(user: User) {
    this.printerService
      .removeUserFromPrinter(user._id, this.selectedPrinter._id)
      .subscribe(
        (res) => {
          this.getPrinter();
        },
        (error) => {
          console.log(error);
          this.getUsers();
        }
      );
  }
}
