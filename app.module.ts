import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthGuard} from './auth/guard/authguard';
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
  MatSlideToggleModule, MatExpansionModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './component/account/account.component';
import {LoginComponent} from './component/login/login.component';
import {MessageService} from './service/message.service';
import {SimpleDialogComponent} from './component/simple-dialog/simple-dialog.component';
import {ConfirmRegistrationComponent} from './component/confirm-registration/confirm-registration.component';
import {HomeComponent} from './component/home/home.component';
import {FormCreateComponent} from './component/admin/form-create/form-create.component';
import {MatPaginatorFarsi} from './utils/mat-paginator-farsi';
import {CurrencyPipe} from './utils/pipes/currency.pipe';
import {CurrencyFormatterDirective} from './utils/directives/currency-formatter.directive';
import {DataStorage} from './auth/data.storage';
import {JwtInterceptor} from './auth/helper/jwt.interceptor';
import {ErrorInterceptor} from './auth/helper/error.interceptor';
import {CreateFormComponent} from './component/account/create-form/create-form.component';
import {MyFormsComponent} from './component/account/my-forms/my-forms.component';
import {GroupPlayComponent} from './component/home/group-play/group-play.component';
import {GroupPlayHistoryComponent} from './component/home/group-play-history/group-play-history.component';
import {GroupPlayWinnersComponent} from './component/home/group-play-winners/group-play-winners.component';
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


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'confirmRegistration',
    component: ConfirmRegistrationComponent
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
  {path: '**', redirectTo: '/home'}
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
    ProgressLoaderComponent,
  ],
  entryComponents: [
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
    NotifierModule.withConfig({
      theme: 'material',
      position: {

        horizontal: {

          /**
           * Defines the horizontal position on the screen
           * @type {'left' | 'middle' | 'right'}
           */
          position: 'right',

          /**
           * Defines the horizontal distance to the screen edge (in px)
           * @type {number}
           */
          distance: 12

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
          distance: 70,

          /**
           * Defines the vertical gap, existing between multiple notifications (in px)
           * @type {number}
           */
          gap: 10

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
          speed: 300,

          /**
           * Defines which easing method will be used when animating a new notification in
           * @type {'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'}
           */
          easing: 'ease'

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
          speed: 300,

          /**
           * Defines which easing method will be used when animating a new notification out
           * @type {'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'}
           */
          easing: 'ease',

          /**
           * Defines the animation offset used when hiding multiple notifications at once (in ms)
           * @type {number | false}
           */
          offset: 50

        },

        shift: {

          /**
           * Defines how long it will take to shift a notification around (in ms)
           * @type {number}
           */
          speed: 300,

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
    {provide: MatPaginatorIntl, useClass: MatPaginatorFarsi},
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
