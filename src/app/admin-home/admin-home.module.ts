import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { AdminHomeRoutingModule } from './admin-home.routing';
import { CategoryComponent } from './category/category.component';
import { RoleComponent } from './role/role.component';
import { CustomerComponent } from './customer/customer.component';
import { InsertCustomerDialogComponent } from './customer/insert-customer-dialog/insert-customer-dialog.component';
import { UpdateCustomerDialogComponent } from './customer/update-customer-dialog/update-customer-dialog.component';



@NgModule({
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
  ],
  declarations: [
    IndexComponent,
    CategoryComponent,
    RoleComponent,
    CustomerComponent,
  ],
})
export class AdminHomeModule { }
