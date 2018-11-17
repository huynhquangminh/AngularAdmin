import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api-service';
import { GETROLE_URL, DELETEROLE_URL } from './config';
import { MatDialog } from '@angular/material';
import { InsertRoleDialogComponent } from './insert-dialog/insert-dialog.component';
import { UpdateRoleDialogComponent } from './update-dialog/update-dialog.component';
import { DeleteRoleRequest } from '../../model/deleteRoleRequest';
import { MessageComfrimComponent } from '../message/message.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  private listRoles: any = [];
  deleteRoleRequest = new DeleteRoleRequest();
  dialogRef: any;
  constructor(
    public dialog: MatDialog,
    public _apiservice: ApiService,
  ) { }

  ngOnInit() {
    this._apiservice.CallAllService(GETROLE_URL).subscribe(data => {
      if (data) {
        if (data.Success === false) {
          alert('Your Request Is Unsuccessful');
        } else {
          this.listRoles = data.listRoles;
        }
      }
    });
  }

  openDialogInsert() {
    const dialogRef = this.dialog.open(InsertRoleDialogComponent, {
      disableClose: true,
      height: '260px',
      width: '400px'
    });
    this.reloadPage(dialogRef);
  }

  openDialogUpdate($event) {

    const dialogRef = this.dialog.open(UpdateRoleDialogComponent, {
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
        this.deleteRoleRequest.ID = $event;
        this._apiservice.CallByResquestService(DELETEROLE_URL, this.deleteRoleRequest).subscribe(data => {
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
