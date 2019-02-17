import { ApiService } from './../../service/api-service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { InsertDialogComponent } from './insert-dialog/insert-dialog.component';
import { GETLISTCATEGORY_URL, DELETECATEGORY_URL } from './config';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { MessageComfrimComponent } from '../message/message.component';
import { DeleteCategoryRequest } from 'src/app/model/deleteCategoryRequest';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  dialogRef: any;
  listDataCategory: any = [];
  deleteCategoryRequest = new DeleteCategoryRequest();
  constructor(
    public dialog: MatDialog,
    public _apiservice: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this._apiservice.CallAllService(GETLISTCATEGORY_URL).subscribe(data => {
      if (data) {
        if (data.Success === false) {
          alert('Your Request Is Unsuccessful');
        } else {
          this.listDataCategory = data.ListGetCategory;
        }
      }
    });
  }

  openDialogInsert() {
    this.dialogRef = this.dialog.open(InsertDialogComponent, {
      height: '400px',
      width: '600px',
    });
  }

  openDialogUpdate() {
    this.dialogRef = this.dialog.open(UpdateDialogComponent, {
      height: '400px',
      width: '600px',
    });
  }
  deleteCategoryClick($event) {
    const dialogRef = this.dialog.open(MessageComfrimComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.deleteCategoryRequest.id = $event;
        this._apiservice.CallByResquestService(DELETECATEGORY_URL, this.deleteCategoryRequest).subscribe(data => {
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
