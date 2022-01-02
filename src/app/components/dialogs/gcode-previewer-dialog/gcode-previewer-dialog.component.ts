import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gcode-previewer-dialog',
  templateUrl: './gcode-previewer-dialog.component.html',
  styleUrls: ['./gcode-previewer-dialog.component.css'],
})
export class GcodePreviewerDialogComponent implements OnInit {
  gcode: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<GcodePreviewerDialogComponent>
  ) {}

  ngOnInit(): void {
    this.gcode = this.data;
  }
}
