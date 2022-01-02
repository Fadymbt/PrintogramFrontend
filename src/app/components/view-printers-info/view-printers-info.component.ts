import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-printers-info',
  templateUrl: './view-printers-info.component.html',
  styleUrls: ['./view-printers-info.component.css']
})
export class ViewPrintersInfoComponent implements OnInit {
  editingName: boolean = false;
  valueName: string = "";

  @Input() selectedPrinter;

  constructor() { }

  ngOnInit(): void {
  }

  CloseEditingMode() {
    this.editingName = false;
  }

  OnEditName() {
    this.CloseEditingMode();
    this.valueName = this.selectedPrinter.name;
    this.editingName = true;
  }

  OnEditNameSave() {
    this.CloseEditingMode();
  }
}
