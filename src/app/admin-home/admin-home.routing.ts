import { RoleComponent } from './role/role.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CategoryComponent } from './category/category.component';
import { CustomerComponent } from './customer/customer.component';

const homeRoutes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    // { path: 'product/:page', component: ProductComponent },
    // { path: 'product-detail/:id', component: ProductDetailComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'role', component: RoleComponent },
    { path: 'customer', component: CustomerComponent },
    // { path: 'news', component: TintucComponent },
    // { path: 'category/product/:key', component: CategoryComponent },
    // { path: 'news-detail/:id', component: TintucDetailComponent },
    // { path: 'introduce', component: GioithieuComponent },
    // { path: 'searchproduct/:key', component: FindProductComponent },
    // { path: '**', component: Page404Component }

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
