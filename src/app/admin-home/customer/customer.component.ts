import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ApiService } from '../../service/api-service';
import { InsertCustomerDialogComponent } from './insert-customer-dialog/insert-customer-dialog.component';
import { UpdateCustomerDialogComponent } from './update-customer-dialog/update-customer-dialog.component';
import { GETLISTCUSTOMER_URL, DELETECUSTOMER_URL } from './config';
import { DeleteCustomerRequest } from '../../model/deleteCustomerRequest';
import { MessageComfrimComponent } from '../message/message.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  listCustomers: any = [];
  resultDelete = 1;
  requestDeleteCustomer = new DeleteCustomerRequest();
  constructor(
    public dialog: MatDialog,
    public _apiservice: ApiService,
  ) {
  }

  ngOnInit() {
    this._apiservice.CallAllService(GETLISTCUSTOMER_URL).subscribe(data => {
      if (data.Success === false) {
        alert('Your Request Is Unsuccessful');
      } else {
        this.listCustomers = data.ListCustomers;
      }
    });
  }

  openDialogInsert() {
    const dialogRef = this.dialog.open(InsertCustomerDialogComponent, {
      disableClose: true,
      height: '400px',
      width: '450px'
    });
    this.reloadPage(dialogRef);
  }

  openDialogUpdate($event) {

    const dialogRef = this.dialog.open(UpdateCustomerDialogComponent, {
      height: '400px',
      width: '450px',
      data: {
        ID: $event.ID,
        Telephone: $event.Telephone,
        UserName: $event.UserName,
        PassWord: $event.Password,
        NameCustomer: $event.NameCustomer,
        Roleid: $event.RoleId
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
        this.requestDeleteCustomer.ID = $event;
        this._apiservice.CallByResquestService(DELETECUSTOMER_URL, this.requestDeleteCustomer).subscribe(data => {
          if (data.Success === false) {
            alert('Your Request Is Unsuccessful');
          } else {
            this.ngOnInit();
          }
        });
      }
    });
  }
}
