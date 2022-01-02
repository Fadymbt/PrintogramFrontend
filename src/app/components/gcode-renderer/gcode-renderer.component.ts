import { Component, Input, OnInit } from '@angular/core';
import * as GCodePreview from 'gcode-preview';

@Component({
  selector: 'app-gcode-renderer',
  templateUrl: './gcode-renderer.component.html',
  styleUrls: ['./gcode-renderer.component.css'],
})
export class GcodeRendererComponent implements OnInit {
  @Input() gcode: string;
  @Input() index: number;
  currentIndex: number;
  preview: any;

  constructor() {}

  ngOnInit(): void {
    this.renderGCode();
  }

  renderGCode() {
    let gcodeToRender = this.gcode;
    this.preview = new GCodePreview.WebGLPreview({
      targetId: 'gcode-preview',
      buildVolume: { x: 250, y: 220, z: 200 },
      initialCameraPosition: [0, 400, 450],
    });

    this.preview.processGCode(gcodeToRender);
    document.getElementsByTagName('canvas')[0].style.width = '100%';
    document.getElementsByTagName('canvas')[0].id = 'gcode-renderer-canvas';
    this.preview.resize();
    this.preview.render();
  }
}
