import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PrinterService } from 'src/app/service/printer.service';

@Component({
  selector: 'app-view-printers-add',
  templateUrl: './view-printers-add.component.html',
  styleUrls: ['./view-printers-add.component.css']
})
export class ViewPrintersAddComponent implements OnInit {
  valueName: string;
  valueAddress: string;
  valuePort: string;
  valueAPI: string;
  valueCamera: string;

  constructor(private selfRef: MatDialogRef<ViewPrintersAddComponent>, private printerService: PrinterService) { }

  ngOnInit(): void {
  }

  addPrinter() {
    this.printerService.addPrinter(this.valueName).subscribe(
      (res) => {
        this.selfRef.close();
      },
      (error) => {
        console.log(error);
        this.selfRef.close();
      },
    );
  }
}
