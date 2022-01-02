import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrinterService } from 'src/app/service/printer.service';

@Component({
  selector: 'app-view-printers-delete',
  templateUrl: './view-printers-delete.component.html',
  styleUrls: ['./view-printers-delete.component.css']
})
export class ViewPrintersDeleteComponent implements OnInit {

  constructor(
    private selfRef: MatDialogRef<ViewPrintersDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private selectedPrinter,
    private printerService: PrinterService) { }

  ngOnInit(): void {
  }

  deletePrinter() {
    this.printerService.deletePrinter(this.selectedPrinter._id).subscribe(
      (res) => {
        this.selfRef.close();
      },
      (error) => {
        console.log(error);
        this.selfRef.close();
      }
    );
  }
}
