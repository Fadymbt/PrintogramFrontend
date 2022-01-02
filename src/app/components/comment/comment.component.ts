import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() comment: any;
  @Output() commentsSize: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  getDate(timePosted) {
    let startTime = new Date(timePosted);
    startTime = new Date(startTime.getTime());
    const month = startTime.toLocaleString('default', { month: 'long' });
    return month + ' ' + startTime.getDate() + ', ' + startTime.getFullYear();
  }
}
