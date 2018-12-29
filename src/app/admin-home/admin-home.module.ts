import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { AdminHomeRoutingModule } from './admin-home.routing';
import { CategoryComponent } from './category/category.component';
import { RoleComponent } from './role/role.component';
import { CustomerComponent } from './customer/customer.component';
import { MatTableModule , MatSortModule, MatPaginatorModule } from '@angular/material';
import { NewComponent } from './new/new.component';
import { InsertNewDialogComponent } from './new/insert-new-dialog/insert-new-dialog.component';
import { UpdateNewDialogComponent } from './new/update-new-dialog/update-new-dialog.component';



@NgModule({
  imports: [
    CommonModule,
    AdminHomeRoutingModule
  ],
  declarations: [
    IndexComponent,
    CategoryComponent,
    RoleComponent,
    CustomerComponent,
    NewComponent,
  ],
})
export class AdminHomeModule { }
