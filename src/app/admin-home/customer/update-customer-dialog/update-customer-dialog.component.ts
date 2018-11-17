import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../service/api-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GETROLE_URL } from '../../role/config';
import { UpdateCustomerRequest } from '../../../model/updateCustomerRequest';
import { UPDATECUSTOMER_URL } from '../config';

@Component({
  selector: 'app-update-customer-dialog',
  templateUrl: './update-customer-dialog.component.html',
  styleUrls: ['./update-customer-dialog.component.css']
})
export class UpdateCustomerDialogComponent implements OnInit {

  listRoles: any = [];
  isDisable = false;
  roleSelected: any;
  updateCustomerRequest = new UpdateCustomerRequest();
  public _addForm: FormGroup;
  tooltip: NgbTooltip;
  @ViewChild('Telephone') public TelephoneTip: NgbTooltip;
  @ViewChild('UserName') public UserNameTip: NgbTooltip;
  @ViewChild('PassWord') public PassWordTip: NgbTooltip;
  @ViewChild('NameCustomer') public NameCustomerTip: NgbTooltip;
  constructor(
    private _apiService: ApiService,
    private _formBuilder: FormBuilder,
    private dialogref: MatDialogRef<UpdateCustomerDialogComponent>,
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
    this.dialogref.disableClose = true;
    this._addForm.get('Telephone').setValue(this.data.Telephone);
    this._addForm.get('UserName').setValue(this.data.UserName);
    this._addForm.get('PassWord').setValue(this.data.PassWord);
    this._addForm.get('NameCustomer').setValue(this.data.NameCustomer);
    // this._addForm.get('Roleid').setValue(this.data.Roleid);
    this.roleSelected = this.data.Roleid.toString();

    this._apiService.CallAllService(GETROLE_URL).subscribe(data => {
      if (data) {
        this.listRoles = data.listRoles;
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
    this.updateCustomerRequest = {
      ID: this.data.ID,
      Telephone: this._addForm.get('Telephone').value,
      UserName: this._addForm.get('UserName').value,
      PassWord: this._addForm.get('PassWord').value,
      NameCustomer: this._addForm.get('NameCustomer').value,
      RoleId: this.roleSelected
    };
    this._apiService.CallByResquestService(UPDATECUSTOMER_URL, this.updateCustomerRequest).subscribe(data => {
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
}
