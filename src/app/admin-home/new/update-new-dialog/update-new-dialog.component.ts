import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { GETLISTCUSTOMER_URL } from '../../customer/config';
import { UPDATENEWS_URL } from '../config';
import { EditNewsRequest } from 'src/app/model/updateNewsRequest';

@Component({
  selector: 'app-update-new-dialog',
  templateUrl: './update-new-dialog.component.html',
  styleUrls: ['./update-new-dialog.component.css']
})
export class UpdateNewDialogComponent implements OnInit {
  public _addForm: FormGroup;
  tooltip: NgbTooltip;
  nameFile: string;
  requestData = new EditNewsRequest();
  imgsrc: any = '';
  fileList: FileList;
  file: File;
  tampFile = false;
  isDisable = true;
  listCustomer: any;
  customerSelected: string;
  @ViewChild('tip1') public tooltip1: NgbTooltip;
  @ViewChild('tip2') public tooltip2: NgbTooltip;
  @ViewChild('tip3') public tooltip3: NgbTooltip;
  @ViewChild('tip4') public tooltip4: NgbTooltip;
  @ViewChild('tip5') public tooltip5: NgbTooltip;
  constructor(
    private _apiService: ApiService,
    private _formBuilder: FormBuilder,
    private dialogref: MatDialogRef<UpdateNewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this._addForm = this._formBuilder.group({
      NameNews: ['', [Validators.required]],
      UserCreate: [0, [Validators.required]],
      Date: [formatDate(this.data.Date, 'yyyy-MM-dd', 'en'), [Validators.required]],
      ImageNews: [],
      ViewMax: [1, [Validators.required, Validators.min]],
      DescriptionNews: ['', [Validators.required]],
    });
    this.GetUserCreator();
    this._addForm.get('NameNews').setValue(this.data.NameNews);
    this.customerSelected = this.data.IDCreater.toString();
    this._addForm.get('ViewMax').setValue(this.data.ViewMax);
    this._addForm.get('DescriptionNews').setValue(this.data.DescriptionNews);
    this.imgsrc = 'http://localhost:3100/image/' + this.data.ImageNews;
    this.dialogref.disableClose = true;
  }
  onSelectedFile(event) {
    this.fileList = event.target.files;
    if (event.target.files.length > 0) {
      this.nameFile = event.target.files[0].name;
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => {
        this.imgsrc = (<FileReader>event.target).result;
        this.tampFile = true;
      };
    } else {
      this.imgsrc = '';
    }
    this.onLostFocus('NameCategory');
  }
  GetUserCreator() {
    this._apiService.CallAllService(GETLISTCUSTOMER_URL).subscribe(data => {
      if (data === false) {
        alert('Your Request Is Unsuccessful');
      } else {
        this.listCustomer = data.ListCustomers;
      }
    });
  }
  CheckValidate(tooltip: NgbTooltip, namecontrol: string) {
    if (!this._addForm.get(namecontrol).valid) {
      tooltip.open('Is is not emtry!');
    } else {
      tooltip.close();
    }
    if (!this._addForm.valid || this.imgsrc === '') {
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
      ID: this.data.ID,
      NameNews: this._addForm.get('NameNews').value,
      IDCreater: +this.customerSelected,
      Date: this._addForm.get('Date').value,
      ImageNews: this.tampFile ? this.nameFile : this.data.ImageNews,
      ImageNewDetail: 'xxx',
      ViewMax: this._addForm.get('ViewMax').value,
      DescriptionNews: this._addForm.get('DescriptionNews').value,
    };
    if (this.tampFile) {
      this._apiService.postFile(this.file).subscribe(data => {
      });
      this.tampFile = false;
    }

    this._apiService.CallByResquestService(UPDATENEWS_URL, this.requestData).subscribe(data => {
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
