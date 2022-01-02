import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrinterService } from 'src/app/service/printer.service';
import { ViewPrintersAddComponent } from '../view-printers-add/view-printers-add.component';
import { ViewPrintersDeleteComponent } from '../view-printers-delete/view-printers-delete.component';

@Component({
  selector: 'app-view-printers',
  templateUrl: './view-printers.component.html',
  styleUrls: ['./view-printers.component.css']
})
export class ViewPrintersComponent implements OnInit {
  printers: any = [];
  selectedPrinter;
  searchInputPrinters: string = ""; 
  submenuInfoSelected: boolean = true;
  submenuAccessSelected: boolean = false;
  submenuAssignmentsSelected: boolean = false;

  constructor(
    private printerService: PrinterService, 
    private addPrinterDialog: MatDialog,
    private deletePrinterDialog: MatDialog) { 
  }

  ngOnInit(): void {
    this.getPrinters();
  }

  getPrinters() {
    this.printerService.getPrinters().subscribe(
      (res) => {
        this.printers = res;
        if(this.printers.length > 0) {
          this.selectedPrinter = this.printers[0];
        }
        console.log(this.printers[0]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onSelectPrinter(printer) {
    this.selectedPrinter = printer;
  }

  compareUserToSearchInput(printer) {
    let stringA = printer.name.toLowerCase().trim();
    let stringB = this.searchInputPrinters.toLowerCase().trim();
    if(stringA.match(stringB) != null) {
      return true;
    }
    return false;
  }

  diselectAllSubmenus() {
    this.submenuInfoSelected = false;
    this.submenuAccessSelected = false;
    this.submenuAssignmentsSelected = false;
  }

  onSelectSubmenuInfo() {
    this.diselectAllSubmenus();
    this.submenuInfoSelected = true;
  }

  onSelectSubmenuAccess() {
    this.diselectAllSubmenus();
    this.submenuAccessSelected = true;
  }

  onSelectSubmenuAssignments() {
    this.diselectAllSubmenus();
    this.submenuAssignmentsSelected = true;
  }

  onOpenAddPrinterDialog() {
    let filesDialogRef = this.addPrinterDialog.open(ViewPrintersAddComponent);

    filesDialogRef.afterClosed().subscribe(() => {
      this.getPrinters();
    });
  }

  onOpenDeletePrinterDialog() {
    let filesDialogRef = this.deletePrinterDialog.open(ViewPrintersDeleteComponent, {data: this.selectedPrinter});

    filesDialogRef.afterClosed().subscribe(() => {
      this.getPrinters();
    });
  }
}
