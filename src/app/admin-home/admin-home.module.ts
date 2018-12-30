import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { AdminHomeRoutingModule } from './admin-home.routing';
import { CategoryComponent } from './category/category.component';
import { RoleComponent } from './role/role.component';
import { CustomerComponent } from './customer/customer.component';
import { NewComponent } from './new/new.component';




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
  ],
  providers: [],
})
export class AdminHomeModule { }
