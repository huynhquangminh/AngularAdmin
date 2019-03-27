import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateProductRequest } from 'src/app/model/updateProductRequest';
import { UPDATEPRODUCT_URL } from '../config';

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.css']
})
export class UpdateProductDialogComponent implements OnInit {
  public _addForm: FormGroup;
  tooltip: NgbTooltip;
  imgsrc: any = '';
  fileList: FileList;
  file: File;
  nameFile: string;
  datadialog: any;
  isDisable = true;
  selectedProduct: any;
  tampFile = false;
  requestData = new  UpdateProductRequest();
  @ViewChild('tip1') public tooltip1: NgbTooltip;
  @ViewChild('tip2') public tooltip2: NgbTooltip;
  @ViewChild('tip3') public tooltip3: NgbTooltip;
  @ViewChild('tip4') public tooltip4: NgbTooltip;
  @ViewChild('tip5') public tooltip5: NgbTooltip;
  @ViewChild('tip6') public tooltip6: NgbTooltip;
  constructor(
    private _apiService: ApiService,
    private _formBuilder: FormBuilder,
    private dialogref: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.datadialog = data.ListCategory;
  }

  ngOnInit() {
    this._addForm = this._formBuilder.group({
      NameProduct: ['', [Validators.required]],
      Price: [0, [Validators.required]],
      Amount: [1, [Validators.required]],
      PriceSale: [0],
      SellMax: [1],
      ImageProduct: [],
      BriefDes: ['', [Validators.required]],
      DescriptionProduct: ['', [Validators.required]],
    });
    this.dialogref.disableClose = true;
    this._addForm.get('NameProduct').setValue(this.data.NameProduct);
    this._addForm.get('Price').setValue(this.data.Price);
    this._addForm.get('Amount').setValue(this.data.Amount);
    this._addForm.get('PriceSale').setValue(this.data.PriceSale);
    this._addForm.get('SellMax').setValue(this.data.SellMax);
    this._addForm.get('BriefDes').setValue(this.data.BriefDes);
    this._addForm.get('DescriptionProduct').setValue(this.data.DescriptionProduct);
    this.selectedProduct = this.data.IDCategory.toString();
    this.imgsrc = 'http://localhost:3100/image/' + this.data.ImageProduct;
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
      ID: this.data.ID,
      NameProduct: this._addForm.get('NameProduct').value,
      Price: this._addForm.get('Price').value,
      BriefDes: this._addForm.get('BriefDes').value,
      Description: this._addForm.get('DescriptionProduct').value,
      ImageProduct: this.tampFile ? this.nameFile : this.data.ImageProduct,
      ImageProductDetail1: '',
      ImageProductDetail2: '',
      Amount: this._addForm.get('Amount').value,
      IDCategory: this.selectedProduct,
      PriceSale: this._addForm.get('PriceSale').value,
      InterestProduct: 0,
      SellMax: this._addForm.get('SellMax').value,
    };

    if (this.tampFile) {
      this._apiService.postFile(this.file).subscribe(data => {
      });
      this.tampFile = false;
    }

    this._apiService.CallByResquestService(UPDATEPRODUCT_URL, this.requestData).subscribe(data => {
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
