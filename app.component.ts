// import {LoginComponent} from './component/login/login.component';
// import {AuthenticationService} from './service/authentication.service';
// import {
//   AfterContentChecked,
//   AfterContentInit,
//   AfterViewChecked,
//   Component,
//   DoCheck,
//   Inject,
//   OnChanges,
//   OnDestroy,
//   OnInit
// } from '@angular/core';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import {Router} from '@angular/router';
// import {DataStorage} from './auth/data.storage';
// import {UserService} from './service/user.service';
// import * as moment from 'jalali-moment';
//
// @Component({
//   selector: 'app',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit
// {
//   username: string;
//   balance: string;
//   bitcoinValue: string;
//   today: number = Date.now();
//   todayJalali:any = moment().locale('fa').format('YYYY/M/D');
//
//   constructor(private router: Router,
//               private userService: UserService,
//               private dataStorage: DataStorage,
//               private authenticationService: AuthenticationService,
//               private dialog: MatDialog)
//   {
//     setInterval(() =>
//     {
//       this.todayJalali = moment().locale('fa').format('YYYY/M/D');
//       this.today = Date.now();
//     }, 1);
//   }
//
//   ngOnInit(): void
//   {
//   }
//
//   openDialog(): void
//   {
//     const dialogRef = this.dialog.open(LoginComponent,
//       {
//         width: '30%',
//       });
//
//     dialogRef.disableClose = true;
//
//     dialogRef.afterClosed().subscribe(result =>
//     {
//     });
//   }
//
//   closeDialog(): void
//   {
//     this.dialog.closeAll();
//   }
//
//   isUserLoggedIn()
//   {
//     if (this.authenticationService.isUserLoggedIn())
//     {
//       if (this.authenticationService.getLoggedInUser(false))
//         this.username = this.authenticationService.getLoggedInUser(false).username;
//       else
//         this.username = '';
//       if (this.authenticationService.getLoggedInUserAccount(false))
//         this.balance = this.authenticationService.getLoggedInUserAccount(false).balance;
//       else
//         this.balance = '';
//       if (this.dataStorage.getBitCoinValue())
//         this.bitcoinValue = this.dataStorage.getBitCoinValue().value;
//       else
//         this.bitcoinValue = '';
//       return true;
//     }
//     return false;
//   }
//
//   setBitcoinValue(value: string)
//   {
//     const reg = new RegExp('^[0-9]+(,[0-9]+)*$');
//     if (value === '' || !reg.test(value))
//     {
//       value = '';
//     }
//
//     this.bitcoinValue = value;
//     this.dataStorage.saveBitCoinValue(value);
//   }
//
//   accessibleByRole(role)
//   {
//     return this.authenticationService.checkRoleAccessibility(role);
//   }
//
//   logout(): void
//   {
//     this.authenticationService.logout();
//     this.router.navigate(['/homeOld']);
//   }
//
//   updateAccountData()
//   {
//     this.userService.updateUserAccountBalance();
//   }
// }


import { Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  constructor()
  {
  }

  ngOnInit(): void
  {
    if (environment.production) {
      if (location.protocol === 'http:') {
        window.location.href = location.href.replace('http', 'https');
      }
    }
  }
}
