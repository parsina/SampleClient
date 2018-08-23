import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthGuard } from "./auth/guard/authguard";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatTableModule,
  MatIconModule,
  MatPaginatorModule,
  MatGridListModule,
  MatDialogModule,
  MatTabsModule,
  MAT_DIALOG_DATA,
  MatSelectModule, MatCheckboxModule, MatPaginatorIntl
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { CryptoHomeComponent } from './component/crypto-home/crypto-home.component';
import { AccountComponent } from './component/account/account.component';
import { BitcoinComponent } from './component/bitcoin/bitcoin.component';
import { ContactComponent } from './component/contact/contact.component';
import { BitcointradeService } from "./service/bitcointrade.service";
import { MarketService } from './service/market.service';
import { LoginComponent } from './component/login/login.component';
import { MessageService } from "./service/message.service";
import { SimpleDialogComponent } from './component/simple-dialog/simple-dialog.component';
import { ConfirmRegistrationComponent } from './component/confirm-registration/confirm-registration.component';
import { HomeComponent } from './component/home/home.component';
import { FormCreateComponent } from './component/form-create/form-create.component';
import {MatPaginatorFarsi} from './utils/mat-paginator-farsi';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'confirm',
    component:ConfirmRegistrationComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'bitcoin',
    component: BitcoinComponent
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'formCreate',
    component: FormCreateComponent,
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
//  {
//    path: 'car-add',
//    component: CarEditComponent
//  },
//  {
//    path: 'car-edit/:id',
//    component: CarEditComponent
//  }
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    CryptoHomeComponent,
    BitcoinComponent,
    AccountComponent,
    ContactComponent,
    LoginComponent,
    SimpleDialogComponent,
    ConfirmRegistrationComponent,
    HomeComponent,
    FormCreateComponent
  ],
  entryComponents: [
    SimpleDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule,
    MatGridListModule
  ],
  providers: [
    MarketService,
    BitcointradeService,
    {provide: MatPaginatorIntl, useClass: MatPaginatorFarsi},
    {provide: MAT_DIALOG_DATA, useValue: {}},
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
