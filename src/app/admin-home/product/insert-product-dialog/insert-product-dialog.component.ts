import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { INSERTPRODUCT_URL } from '../config';
import { InsertProductRequest } from 'src/app/model/insertProductRequest';

@Component({
  selector: 'app-insert-product-dialog',
  templateUrl: './insert-product-dialog.component.html',
  styleUrls: ['./insert-product-dialog.component.css']
})
export class InsertProductDialogComponent implements OnInit {
  public _addForm: FormGroup;
  tooltip: NgbTooltip;
  imgsrc: any = '';
  fileList: FileList;
  file: File;
  nameFile: string;
  datadialog: any;
  isDisable = true;
  selectedProduct: any;
  requestData = new  InsertProductRequest();
  @ViewChild('tip1') public tooltip1: NgbTooltip;
  @ViewChild('tip2') public tooltip2: NgbTooltip;
  @ViewChild('tip3') public tooltip3: NgbTooltip;
  @ViewChild('tip4') public tooltip4: NgbTooltip;
  @ViewChild('tip5') public tooltip5: NgbTooltip;
  @ViewChild('tip6') public tooltip6: NgbTooltip;
  constructor(
    private _apiService: ApiService,
    private _formBuilder: FormBuilder,
    private dialogref: MatDialogRef<InsertProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.datadialog = data;
     this.selectedProduct =  this.datadialog[0].ID.toString();
     }

  ngOnInit() {
    this._addForm = this._formBuilder.group({
      NameProduct: ['', [Validators.required]],
      Price: [0, [Validators.required]],
      Amount: [1, [Validators.required]],
      PriceSale: [0, ],
      SellMax: [1],
      ImageProduct: [],
      BriefDes: ['', [Validators.required]],
      DescriptionProduct: ['', [Validators.required]],
    });
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
      };
    } else {
      this.imgsrc = '';
    }
    this.onLostFocus('NameCategory');
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
      case 'NameProduct': this.CheckValidate(this.tooltip1, nameControl); break;
      case 'Price': this.CheckValidate(this.tooltip2, nameControl); break;
      case 'Amount': this.CheckValidate(this.tooltip3, nameControl); break;
      case 'BriefDes': this.CheckValidate(this.tooltip5, nameControl); break;
      case 'DescriptionProduct': this.CheckValidate(this.tooltip6, nameControl); break;
    }
  }
  ClickSave() {
    this.requestData = {
      NameProduct: this._addForm.get('NameProduct').value,
      Price: this._addForm.get('Price').value,
      BriefDes: this._addForm.get('BriefDes').value,
      Description: this._addForm.get('DescriptionProduct').value,
      ImageProduct: this.nameFile,
      ImageProductDetail1: '',
      ImageProductDetail2: '',
      Amount: this._addForm.get('Amount').value,
      IDCategory: this.selectedProduct,
      PriceSale: this._addForm.get('PriceSale').value,
      InterestProduct: 0,
      SellMax: this._addForm.get('SellMax').value,
    };

    this._apiService.postFile(this.file).subscribe(data => {
    });

    this._apiService.CallByResquestService(INSERTPRODUCT_URL, this.requestData).subscribe(data => {
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
