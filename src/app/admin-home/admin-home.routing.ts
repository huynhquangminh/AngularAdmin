import { RoleComponent } from './role/role.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CategoryComponent } from './category/category.component';
import { CustomerComponent } from './customer/customer.component';
import { NewComponent } from './new/new.component';
import { ProductComponent } from './product/product.component';

const homeRoutes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'role', component: RoleComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'news', component: NewComponent },
    { path: 'product/:page', component: ProductComponent },

];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminHomeRoutingModule { }
