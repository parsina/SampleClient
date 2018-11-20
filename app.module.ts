import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthGuard } from "./auth/guard/authguard";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
  MatSelectModule,
  MatCheckboxModule,
  MatPaginatorIntl,
  MatTooltipModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatSlideToggleModule, MatExpansionModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './component/account/account.component';
import { LoginComponent } from './component/login/login.component';
import { MessageService } from "./service/message.service";
import { SimpleDialogComponent } from './component/simple-dialog/simple-dialog.component';
import { ConfirmRegistrationComponent } from './component/confirm-registration/confirm-registration.component';
import { HomeComponent } from './component/home/home.component';
import { FormCreateComponent } from './component/admin/form-create/form-create.component';
import {MatPaginatorFarsi} from './utils/mat-paginator-farsi';
import { CurrencyPipe } from './utils/pipes/currency.pipe';
import { CurrencyFormatterDirective } from './utils/directives/currency-formatter.directive';
import {DataStorage} from './auth/data.storage';
import {JwtInterceptor} from './auth/helper/jwt.interceptor';
import {ErrorInterceptor} from './auth/helper/error.interceptor';
import { CreateFormComponent } from './component/account/create-form/create-form.component';
import { MyFormsComponent } from './component/account/my-forms/my-forms.component';
import { GroupPlayComponent } from './component/home/group-play/group-play.component';
import { GroupPlayHistoryComponent } from './component/home/group-play-history/group-play-history.component';
import { GroupPlayWinnersComponent } from './component/home/group-play-winners/group-play-winners.component';
import { AdminComponent } from './component/admin/admin.component';
import { EditTemplateFormComponent } from './component/admin/edit-template-form/edit-template-form.component';
import { TransactionComponent } from './component/account/transaction/transaction.component';
import { InitialiseDataComponent } from './component/admin/initialise-data/initialise-data.component';
import { InvitationComponent } from './component/account/invitation/invitation.component';
import { GuideComponent } from './component/guide/guide.component';
import { SettingsComponent } from './component/account/settings/settings.component';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'confirmRegistration',
    component:ConfirmRegistrationComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'guide',
    component: GuideComponent,
  },
  {
    path: 'administrator',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    LoginComponent,
    SimpleDialogComponent,
    ConfirmRegistrationComponent,
    HomeComponent,
    FormCreateComponent,
    CurrencyPipe,
    CurrencyFormatterDirective,
    CreateFormComponent,
    MyFormsComponent,
    GroupPlayComponent,
    GroupPlayHistoryComponent,
    GroupPlayWinnersComponent,
    AdminComponent,
    EditTemplateFormComponent,
    TransactionComponent,
    InitialiseDataComponent,
    InvitationComponent,
    GuideComponent,
    SettingsComponent,
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
    MatSortModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatGridListModule,
    MatTooltipModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatExpansionModule
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: MatPaginatorFarsi},
    {provide: MAT_DIALOG_DATA, useValue: {}},
    MessageService,
    CurrencyPipe,
    DataStorage,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
