import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ApiService } from 'src/app/service/api-service';
import { InsertProductDialogComponent } from './insert-product-dialog/insert-product-dialog.component';
import { UpdateProductDialogComponent } from './update-product-dialog/update-product-dialog.component';
import { MessageComfrimComponent } from '../message/message.component';
import { DeleteProductRequest } from 'src/app/model/deleteProductRequest';
import { GetProductAllRequest } from 'src/app/model/getProductRequest';
import { ActivatedRoute } from '@angular/router';
import {GETPRODUCT_URL, DELETEPRODUCT_URL} from './config';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  listProducts: any[];
  listCategorys: any[];
  sub: any;
  maxSize = 5;
  bigTotalItems = 0;
  bigCurrentPage = 1;
  dialogRef: any;
  deleteProductRequest = new DeleteProductRequest();
  urlImage = 'http://localhost:3100/image/';
  listproductRequest: GetProductAllRequest = {
    StartPage: 1,
    Type: 0
  };
  constructor(
    public dialog: MatDialog,
    public _apiservice: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.callService();
  }

  callService() {
    this._apiservice.CallByResquestService(GETPRODUCT_URL, this.listproductRequest).subscribe(data => {
      if (data) {
        if (data.Success === false) {
          alert('Your Request Is Unsuccessful');
        } else {
          this.listProducts = data.ListProductAdmin;
          this.listCategorys = data.ListCategory;
          if (this.listProducts !== null && this.listProducts !== undefined) {
            this.bigTotalItems = this.listProducts[0].TotalRows;
          }
        }
      }
    });
  }
  pageChanged(pageIdex: any) {
    this.listproductRequest.StartPage = pageIdex.page;
    this.callService();
  }
  openDialogInsert() {
    const dialogRef = this.dialog.open(InsertProductDialogComponent, {
      disableClose: true,
      height: '800px',
      width: '700px',
      data: this.listCategorys
    });
    this.reloadPage(dialogRef);
  }

  openDialogUpdate($event) {
    const dialogRef = this.dialog.open(UpdateProductDialogComponent, {
      height: '800px',
      width: '700px',
      data: {
        ID: $event.ID,
        NameProduct: $event.NameProduct,
        Price: $event.Price,
        Amount: $event.Amount,
        PriceSale: $event.PriceSale,
        SellMax: $event.SellMax,
        ImageProduct: $event.ImageProduct,
        BriefDes: $event.BriefDes,
        DescriptionProduct: $event.Description,
        IDCategory: $event.IDCategory,
        ListCategory: this.listCategorys
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
        this.deleteProductRequest.ID = $event;
        this._apiservice.CallByResquestService(DELETEPRODUCT_URL, this.deleteProductRequest).subscribe(data => {
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
