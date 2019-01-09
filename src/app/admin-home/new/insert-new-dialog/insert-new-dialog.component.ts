import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../service/api-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Add_NewsRequest } from 'src/app/model/insertNewRequest';
import { INSERTNEWS_URL } from '../config';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-insert-new-dialog',
  templateUrl: './insert-new-dialog.component.html',
  styleUrls: ['./insert-new-dialog.component.css']
})
export class InsertNewDialogComponent implements OnInit {

  public _addForm: FormGroup;
  tooltip: NgbTooltip;
  nameFile: string;
  requestData = new Add_NewsRequest();
  @ViewChild('tip1') public tooltip1: NgbTooltip;
  @ViewChild('tip2') public tooltip2: NgbTooltip;
  @ViewChild('tip3') public tooltip3: NgbTooltip;
  @ViewChild('tip4') public tooltip4: NgbTooltip;
  @ViewChild('tip5') public tooltip5: NgbTooltip;
  isDisable = true;
  constructor(
    private _apiService: ApiService,
    private _formBuilder: FormBuilder,
    private dialogref: MatDialogRef<InsertNewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit() {
    const a = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this._addForm = this._formBuilder.group({
      NameNews: ['', [Validators.required]],
      UserCreate: [0, [Validators.required]],
      NameRole: [1],
      Date: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      ImageNews: [],
      ViewMax: [1, [Validators.required, Validators.min]],
      DescriptionNews: ['', [Validators.required]],
    });
    this.dialogref.disableClose = true;
  }

  onSelectedFile(event) {
    this.nameFile = event.target.files[0].name;
  }
  CheckValidate(tooltip: NgbTooltip, namecontrol: string) {
    if (!this._addForm.get(namecontrol).valid) {
      tooltip.open('Is is not emtry!');
    } else {
      tooltip.close();
    }
    if (!this._addForm.valid) {
      this.isDisable = true;
    } else {
      this.isDisable = false;
    }
  }

  onLostFocus(nameControl: string) {
    switch (nameControl) {
      case 'NameNews': this.CheckValidate(this.tooltip1, nameControl); break;
      case 'UserCreate': this.CheckValidate(this.tooltip2, nameControl); break;
      case 'Date': this.CheckValidate(this.tooltip3, nameControl); break;
      case 'ViewMax': this.CheckValidate(this.tooltip4, nameControl); break;
      case 'DescriptionNews': this.CheckValidate(this.tooltip5, nameControl); break;
    }
  }

  ClickSave() {
    this.requestData = {
      NameNews: this._addForm.get('NameNews').value,
      IDCreater:  this._addForm.get('UserCreate').value,
      Date: this._addForm.get('Date').value,
      ImageNews: this.nameFile,
      ImageNewDetail: 'xxx',
      ViewMax: this._addForm.get('ViewMax').value,
      DescriptionNews: this._addForm.get('DescriptionNews').value,
    };

    this._apiService.CallByResquestService(INSERTNEWS_URL, this.requestData).subscribe(data => {
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
