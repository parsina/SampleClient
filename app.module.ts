import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
  MatSlideToggleModule,
  MatExpansionModule, MatSnackBarModule, MatProgressBarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './component/account/account.component';
import {LoginComponent} from './component/login/login.component';
import {MessageService} from './service/message.service';
import {SimpleDialogComponent} from './component/simple-dialog/simple-dialog.component';
import {ConfirmRegistrationComponent} from './component/confirm-registration/confirm-registration.component';
import {FormCreateComponent} from './component/admin/form-create/form-create.component';
import {CurrencyPipe} from './utils/pipes/currency.pipe';
import {CurrencyFormatterDirective} from './utils/directives/currency-formatter.directive';
import {DataStorage} from './auth/data.storage';
import {JwtInterceptor} from './auth/helper/jwt.interceptor';
import {ErrorInterceptor} from './auth/helper/error.interceptor';
import {CreateFormComponent} from './component/account/create-form/create-form.component';
import {MyFormsComponent} from './component/account/my-forms/my-forms.component';
import {GroupPlayComponent} from './component/homeOld/group-play/group-play.component';
import {GroupPlayHistoryComponent} from './component/homeOld/group-play-history/group-play-history.component';
import {GroupPlayWinnersComponent} from './component/homeOld/group-play-winners/group-play-winners.component';
import {AdminComponent} from './component/admin/admin.component';
import {EditTemplateFormComponent} from './component/admin/edit-template-form/edit-template-form.component';
import {TransactionComponent} from './component/account/transaction/transaction.component';
import {InitialiseDataComponent} from './component/admin/initialise-data/initialise-data.component';
import {InvitationComponent} from './component/account/invitation/invitation.component';
import {GuideComponent} from './component/guide/guide.component';
import {SettingsComponent} from './component/account/settings/settings.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ProgressLoaderComponent} from './component/progress-loader/progress-loader.component';
import {NotifierModule} from 'angular-notifier';
import { ITokComponent } from './component/i-tok/i-tok.component';
import { LoginRixComponent } from './component/bitrix/login-rix/login-rix.component';
import { RegisterRixComponent } from './component/bitrix/register-rix/register-rix.component';
import {AuthGuard} from './auth/guard/authguard';
import {HomeComponent} from './component/bitrix/home/home.component';
import { HelpComponent } from './component/bitrix/help/help.component';
import { ConfirmVerificationComponent } from './component/bitrix/confirm-verification/confirm-verification.component';
import { ChangePasswordRixComponent } from './component/bitrix/change-password-rix/change-password-rix.component';
import {HomeOldComponent} from './component/homeOld/homeOld.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MessageComponent } from './component/bitrix/message/message.component';
import { AdministratorComponent } from './component/bitrix/administrator/administrator.component';


const appRoutes: Routes = [
  {
    path: 'Home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Admin',
    component: AdministratorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'confirmVerification',
    component: ConfirmVerificationComponent
  },
  {
    path: 'Register',
    component: RegisterRixComponent
  },
  {
    path: 'Login',
    component: LoginRixComponent
  },
  {
    path: '',
    redirectTo: '/Login',
    pathMatch: 'full'
  },
  {path: '**', redirectTo: '/Login'}



  // {
  //   path: 'confirmRegistration',
  //   component: ConfirmRegistrationComponent
  // },
  // {
  //   path: 'itok',
  //   component: ITokComponent
  // },
  // {
  //   path: 'homeOld',
  //   component: HomeOldComponent
  // },
  // {
  //   path: 'account',
  //   component: AccountComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'guide',
  //   component: GuideComponent,
  // },
  // {
  //   path: 'administrator',
  //   component: AdminComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  // {path: '**', redirectTo: '/homeOld'}
];

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    LoginComponent,
    SimpleDialogComponent,
    ConfirmRegistrationComponent,
    HomeComponent,
    HomeOldComponent,
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
    ProgressLoaderComponent,
    ITokComponent,
    LoginRixComponent,
    RegisterRixComponent,
    HelpComponent,
    ConfirmVerificationComponent,
    ChangePasswordRixComponent,
    MessageComponent,
    AdministratorComponent
  ],
  entryComponents: [
    ChangePasswordRixComponent,
    SimpleDialogComponent,
    ProgressLoaderComponent
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
    MatExpansionModule,
    MatProgressBarModule,
    FlexLayoutModule,
    MatSnackBarModule,
    NotifierModule.withConfig({
      theme: 'material',
      position: {

        horizontal: {

          /**
           * Defines the horizontal position on the screen
           * @type {'left' | 'middle' | 'right'}
           */
          position: 'middle',

          /**
           * Defines the horizontal distance to the screen edge (in px)
           * @type {number}
           */
          distance: 500

        },

        vertical: {

          /**
           * Defines the vertical position on the screen
           * @type {'top' | 'bottom'}
           */
          position: 'top',

          /**
           * Defines the vertical distance to the screen edge (in px)
           * @type {number}
           */
          distance: 100,

          /**
           * Defines the vertical gap, existing between multiple notifications (in px)
           * @type {number}
           */
          gap: 5

        }

      },
      behaviour: {

        /**
         * Defines whether each notification will hide itself automatically after a timeout passes
         * @type {number | false}
         */
        autoHide: 5000,

        /**
         * Defines what happens when someone clicks on a notification
         * @type {'hide' | false}
         */
        onClick: 'hide',

        /**
         * Defines what happens when someone hovers over a notification
         * @type {'pauseAutoHide' | 'resetAutoHide' | false}
         */
        onMouseover: 'pauseAutoHide',

        /**
         * Defines whether the dismiss button is visible or not
         * @type {boolean}
         */
        showDismissButton: false,

        /**
         * Defines whether multiple notification will be stacked, and how high the stack limit is
         * @type {number | false}
         */
        stacking: 10

      },
      animations: {

        /**
         * Defines whether all (!) animations are enabled or disabled
         * @type {boolean}
         */
        enabled: true,

        show: {

          /**
           * Defines the animation preset that will be used to animate a new notification in
           * @type {'fade' | 'slide'}
           */
          preset: 'slide',

          /**
           * Defines how long it will take to animate a new notification in (in ms)
           * @type {number}
           */
          speed: 500,

          /**
           * Defines which easing method will be used when animating a new notification in
           * @type {'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'}
           */
          easing: 'ease-in'

        },

        hide: {

          /**
           * Defines the animation preset that will be used to animate a new notification out
           * @type {'fade' | 'slide'}
           */
          preset: 'fade',

          /**
           * Defines how long it will take to animate a new notification out (in ms)
           * @type {number}
           */
          speed: 500,

          /**
           * Defines which easing method will be used when animating a new notification out
           * @type {'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'}
           */
          easing: 'ease',

          /**
           * Defines the animation offset used when hiding multiple notifications at once (in ms)
           * @type {number | false}
           */
          offset: 100

        },

        shift: {

          /**
           * Defines how long it will take to shift a notification around (in ms)
           * @type {number}
           */
          speed: 500,

          /**
           * Defines which easing method will be used when shifting a notification around
           * @type {string}
           */
          easing: 'ease' // All standard CSS easing methods work

        },

        /**
         * Defines the overall animation overlap, allowing for much smoother looking animations (in ms)
         * @type {number | false}
         */
        overlap: 150

      }
    })
  ],
  providers: [
    // {provide: MatPaginatorIntl, useClass: MatPaginatorFarsi},
    {provide: MAT_DIALOG_DATA, useValue: {}}, MessageService, CurrencyPipe, DataStorage,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule
{
}
