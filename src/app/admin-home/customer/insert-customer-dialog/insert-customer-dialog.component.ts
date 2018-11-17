import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../service/api-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GETROLE_URL } from '../../role/config';
import { InsertCustomerRequest } from '../../../model/insertCustomerRequest';
import { INSERTCUSTOMER_URL } from '../config';

@Component({
  selector: 'app-insert-customer-dialog',
  templateUrl: './insert-customer-dialog.component.html',
  styleUrls: ['./insert-customer-dialog.component.css']
})
export class InsertCustomerDialogComponent implements OnInit {

  public _addForm: FormGroup;
  tooltip: NgbTooltip;
  @ViewChild('Telephone') public TelephoneTip: NgbTooltip;
  @ViewChild('UserName') public UserNameTip: NgbTooltip;
  @ViewChild('PassWord') public PassWordTip: NgbTooltip;
  @ViewChild('NameCustomer') public NameCustomerTip: NgbTooltip;
  isDisable = false;
  listRoles: any = [];
  roleItem: number;
  roleSelected: any;
  requestInsertCustomer = new InsertCustomerRequest();
  constructor(
    private _apiService: ApiService,
    private _formBuilder: FormBuilder,
    private dialogref: MatDialogRef<InsertCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this._addForm = this._formBuilder.group({
      Telephone: ['', [Validators.required]],
      UserName: ['', [Validators.required]],
      PassWord: ['', [Validators.required]],
      NameCustomer: ['', [Validators.required]],
      Roleid: [],
    });
    this.isDisable = true;
    this.dialogref.disableClose = true;
    this._apiService.CallAllService(GETROLE_URL).subscribe(data => {
      if (data) {
        this.listRoles = data.listRoles;
        this.roleSelected = this.listRoles[0].ID.toString();
      }
    });
  }

  onLostFocus(event) {
    switch (event) {
      case 'Telephone': {
        if (!this._addForm.get('Telephone').valid) {
          this.TelephoneTip.open('Is is not emtry!');
          this.isDisable = true;
        } else {
          this.TelephoneTip.close();
        }
        break;
      }
      case 'UserName': {
        if (!this._addForm.get('UserName').valid) {
          this.UserNameTip.open('Is is not emtry!');
          this.isDisable = true;
        } else {
          this.UserNameTip.close();
        }
        break;
      }
      case 'PassWord': {
        if (!this._addForm.get('PassWord').valid) {
          this.PassWordTip.open('Is is not emtry!');
          this.isDisable = true;
        } else {
          this.PassWordTip.close();
        }
        break;
      }
      case 'NameCustomer': {
        if (!this._addForm.get('NameCustomer').valid) {
          this.NameCustomerTip.open('Is is not emtry!');
          this.isDisable = true;
        } else {
          this.NameCustomerTip.close();
        }
        break;
      }

    }
    if (this._addForm.valid) {
      this.isDisable = false;
    }
  }

  ClickSave() {
    this.requestInsertCustomer = {
      Telephone: this._addForm.get('Telephone').value,
      UserName: this._addForm.get('UserName').value,
      PassWord: this._addForm.get('PassWord').value,
      NameCustomer: this._addForm.get('NameCustomer').value,
      RoleId: this.roleSelected
    };
    this._apiService.CallByResquestService(INSERTCUSTOMER_URL, this.requestInsertCustomer).subscribe(data => {
      if (data === false) {
        alert('Your Request Is Unsuccessful');
      } else {
        this.dialogref.close();
      }

    });
  }
  onCancelClick() {
    this.dialogref.close();
  }
  onOptionsSelected(event) {
    this.roleItem = event;
  }
}
