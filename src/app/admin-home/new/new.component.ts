import { InsertNewDialogComponent } from './insert-new-dialog/insert-new-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ApiService } from '../../service/api-service';
import { GETNEWS_URL, DELETENEWS_URL } from './config';
import { UpdateNewDialogComponent } from './update-new-dialog/update-new-dialog.component';
import { MessageComfrimComponent } from '../message/message.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  listNews: any [];
  dialogRef: any;
  constructor(
    public dialog: MatDialog,
    public _apiservice: ApiService,
  ) { }

  ngOnInit() {
    this._apiservice.CallAllService(GETNEWS_URL).subscribe(data => {
      if (data) {
        if (data.Success === false) {
          alert('Your Request Is Unsuccessful');
        } else {
          this.listNews = data.listNewsAll;
        }
      }
    });
  }


  openDialogInsert() {
    const dialogRef = this.dialog.open(InsertNewDialogComponent, {
      disableClose: true,
      height: '430px',
      width: '550px'
    });
    this.reloadPage(dialogRef);
  }

  openDialogUpdate($event) {
    const dialogRef = this.dialog.open(UpdateNewDialogComponent, {
      height: '260px',
      width: '600px',
      data: {
        ID: $event.ID,
        RoleName: $event.RoleName
      }
    });

    this.reloadPage(dialogRef);
  }

  reloadPage(dialogRef: any) {
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteRoleClick($event) {
    const dialogRef = this.dialog.open(MessageComfrimComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // this.deleteRoleRequest.ID = $event;
        this._apiservice.CallByResquestService(DELETENEWS_URL, null).subscribe(data => {
          if (data) {
            if (data === false) {
              alert('Your Request Is Unsuccessful');
            } else {
              this.ngOnInit();
            }
          }
        });
      }
    });
  }
}
