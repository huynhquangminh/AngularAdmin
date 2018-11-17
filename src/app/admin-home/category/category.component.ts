import { ApiService } from './../../service/api-service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { InsertDialogComponent } from './insert-dialog/insert-dialog.component';
import { GETLISTCATEGORY_URL } from './config';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  dialogRef: any;
  listDataCategory: any = [];
  constructor(
    public dialog: MatDialog,
    public _apiserviec: ApiService,
    private router: Router
  ) {
  //   this.router.routeReuseStrategy.shouldReuseRoute = function() {
  //     return false;
  //  };
   }

  ngOnInit() {
    this._apiserviec.CallAllService(GETLISTCATEGORY_URL).subscribe(data => {
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
}
