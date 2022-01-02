import { Component, Input, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication-service.service';
import { FileService } from 'src/app/service/file.service';
import { PrinterService } from 'src/app/service/printer.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css'],
})
export class UploaderComponent {
  listModels: any = [];
  listPrinters: any = [];
  listCurrentPrints = [];
  listFinishedPrints = [];
  searchInputModels: string;
  searchInputPrinters: string;
  selectedModel = null;
  selectedPrinter = null;

  @Output() refreshFilesOut = false;
  rejex = /(?:\.([^.]+))?$/;
  uploadFiles: File[] = [];
  isHovering: boolean;
  cannotUpload = '';

  constructor(
    private authenticationService: AuthenticationService,
    private fileService: FileService,
    private printerService: PrinterService
  ) {}

  ngOnInit(): void {
    this.getFiles();
    this.getPrinters();
    console.log(this.refreshFilesOut);
  }

  getFiles() {
    this.fileService.getFiles().subscribe(
      (res) => {
        this.listModels = res;
        console.group(this.listModels);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getPrinters() {
    this.printerService.getUserPrinters().subscribe(
      (res) => {
        this.listPrinters = res;
        this.getCurrentAndFinishedPrints();
      },
      (error) => {
        console.log(error);
        this.getCurrentAndFinishedPrints();
      }
    );
  }

  getCurrentAndFinishedPrints() {
    this.listCurrentPrints = [];
    this.listFinishedPrints = [];

    this.printerService.getUserPrints().subscribe(
      (res) => {
        this.sortPrints(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sortPrints(allPrints) {
    let now = new Date().getTime();
    for(let i = 0; i < allPrints.length; i++) {
      let print = allPrints[i];
      if(now < print.print_end_time) {
        this.listCurrentPrints.push(print);
      }
      else {
        this.listFinishedPrints.push(print);
      }
    }
  }

  onSelectModel(model) {
    this.selectedModel = model;
  }

  onSelectPrinter(printer) {
    this.selectedPrinter = printer;
  }

  unselectModel() {
    this.selectedModel = null;
  }

  unselectPrinter() {
    this.selectedPrinter = null;
  }

  compareModelToInput(model) {
    return true;
  }

  comparePrinterToInput(printer) {
    return true;
  }

  startNewPrint() {
    if(this.selectedModel == null || this.selectedPrinter == null) {
      return;
    }
    this.printerService.addPrint(this.selectedPrinter._id, this.selectedModel.name).subscribe(
      (res) => {
        this.unselectModel();
        this.unselectPrinter();
        this.getPrinters();
      }, 
      (error) => {
        console.log(error);
      }
    )
  }

  updateProgressBar(bar, progress) {

  }

  getPrintStatus(print) {
    if(print.active) {
      let now = new Date().getTime();
      let start = print.print_start_time;
      let end = print.print_end_time;
      return Math.floor((now - start) / (end - start) * 100) + "%";
    }
    else {
      return "- In Cue -";
    }
  }

  getPrintProgress(print) {
    if(print.active) {
      let now = new Date().getTime();
      let start = print.print_start_time;
      let end = print.print_end_time;
      return Math.floor((now - start) / (end - start) * 100) + "%";
    }
    return "0%";
  }

  getTimePassed(print) {
    if(print.active) {
      let now = new Date().getTime();
      let start = print.print_start_time;
      return now - start;
    }
    return 0;
  }

  getTimeRemaining(print) {
    if(print.active) {
      let now = new Date().getTime();
      let end = print.print_end_time;

      return end - now;
    }
    return print.duration;
  }









  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      if (this.rejex.exec(files.item(i).name)[1] === 'gcode') {
        this.uploadFiles.push(files.item(i));
      } else {
        this.cannotUpload = 'You Can only upload G-code files';
      }
    }
  }

  fileToRemove(file: File) {
    let i: number;
    for (i = 0; i < this.uploadFiles.length; i++) {
      if (this.uploadFiles[i] === file) {
        break;
      }
    }
    this.uploadFiles.splice(i, 1);
    this.refreshFilesOut = true;
  }

  changeRefreshFilesStatus(flag: boolean) {
    this.refreshFilesOut = flag;
  }

  FadeOutSuccessMsg() {
    setTimeout(() => {
      this.cannotUpload = '';
    }, 4000);
    return '';
  }

  RemoveProgress(item: any) {
    setTimeout(() => {
      item.remove();
    }, 1500);
    return '';
  }
}
