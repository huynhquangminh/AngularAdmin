import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { AdminHomeRoutingModule } from './admin-home.routing';
import { CategoryComponent } from './category/category.component';
import { RoleComponent } from './role/role.component';
import { CustomerComponent } from './customer/customer.component';
import { NewComponent } from './new/new.component';
import { ProductComponent } from './product/product.component';
import { InsertProductDialogComponent } from './product/insert-product-dialog/insert-product-dialog.component';
import { UpdateProductDialogComponent } from './product/update-product-dialog/update-product-dialog.component';




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
    NewComponent,
    ProductComponent,
    InsertProductDialogComponent,
    UpdateProductDialogComponent,
  ],
  providers: [],
})
export class AdminHomeModule { }
