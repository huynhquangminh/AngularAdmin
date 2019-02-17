import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api-service';
import { INSERTCATEGORY_URL } from '../config';
import { AddCategoryRequest } from 'src/app/model/insertCategoryRequest';

@Component({
  selector: 'app-insert-dialog',
  templateUrl: './insert-dialog.component.html',
  styleUrls: ['./insert-dialog.component.css']
})
export class InsertDialogComponent implements OnInit {

  public _addForm: FormGroup;
  tooltip: NgbTooltip;
  @ViewChild('tip1') public tooltip1: NgbTooltip;
  isDisable = false;
  fileList: FileList;
  nameFile: string;
  file: File;
  imgsrc: any = '';
  requestData: AddCategoryRequest;
  constructor(
    private _formBuilder: FormBuilder,
    private _apiService: ApiService,
    private dialogref: MatDialogRef<InsertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this._addForm = this._formBuilder.group({
      NameCategory: ['', [Validators.required]],
      imgCategory: [],
    });
    this.dialogref.disableClose = true;
  }

  onCancelClick() {
    this.dialogref.close();
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
      case 'NameCategory': this.CheckValidate(this.tooltip1, nameControl); break;
    }
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
      };
    } else {
      this.imgsrc = '';
    }
    this.onLostFocus('NameCategory');
  }
  ClickSave() {
    this.requestData = {
      nameCategory : this._addForm.get('NameCategory').value,
      imgCategory: this.nameFile
    };
    this._apiService.CallByResquestService(INSERTCATEGORY_URL, this.requestData).subscribe(data => {
      if (data === false) {
        alert('Your Request Is Unsuccessful');
      } else {
        this.dialogref.close();
      }
    });
  }
}
