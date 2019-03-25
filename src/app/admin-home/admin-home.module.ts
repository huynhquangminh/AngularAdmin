import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { AdminHomeRoutingModule } from './admin-home.routing';
import { CategoryComponent } from './category/category.component';
import { RoleComponent } from './role/role.component';
import { CustomerComponent } from './customer/customer.component';
import { NewComponent } from './new/new.component';
import { ProductComponent } from './product/product.component';
import { PaginationModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    PaginationModule.forRoot(),
    FormsModule,
  ],
  declarations: [
    IndexComponent,
    CategoryComponent,
    RoleComponent,
    CustomerComponent,
    NewComponent,
    ProductComponent,
  ],
  providers: [],
})
export class AdminHomeModule { }
