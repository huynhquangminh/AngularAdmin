import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComfrimComponent implements OnInit {
  resulAction = 0;
  constructor(
    public dialogRef: MatDialogRef<MessageComfrimComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
