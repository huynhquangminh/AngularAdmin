import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AppRoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InsertDialogComponent } from './admin-home/category/insert-dialog/insert-dialog.component';
import { MatCardModule, MatIconModule, MatToolbarModule} from '@angular/material';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateDialogComponent } from './admin-home/category/update-dialog/update-dialog.component';
import { ApiService } from './service/api-service';
import { InsertRoleDialogComponent } from './admin-home/role/insert-dialog/insert-dialog.component';
import { UpdateRoleDialogComponent } from './admin-home/role/update-dialog/update-dialog.component';
import { InsertCustomerDialogComponent } from './admin-home/customer/insert-customer-dialog/insert-customer-dialog.component';
import { UpdateCustomerDialogComponent } from './admin-home/customer/update-customer-dialog/update-customer-dialog.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import {MatSelectModule} from '@angular/material/select';
import { MessageComfrimComponent } from './admin-home/message/message.component';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    InsertDialogComponent,
    UpdateDialogComponent,
    InsertRoleDialogComponent,
    UpdateRoleDialogComponent,
    InsertCustomerDialogComponent,
    UpdateCustomerDialogComponent,
    MessageComfrimComponent
  ],
  imports: [
    AppRoutingModule,
    HttpModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    AngularFileUploaderModule,
    NgbModule.forRoot(),
    SelectDropDownModule,
    MatSelectModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  entryComponents: [
    InsertDialogComponent,
    UpdateDialogComponent,
    InsertRoleDialogComponent,
    UpdateRoleDialogComponent,
    InsertCustomerDialogComponent,
    UpdateCustomerDialogComponent,
    MessageComfrimComponent
  ]
})
export class AppModule { }
