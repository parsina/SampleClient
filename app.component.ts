import { LoginComponent } from "./component/login/login.component";
import { AuthenticationService } from "./service/authentication.service";
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";
import {DataStorage} from './auth/data.storage';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{ 
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private dialog: MatDialog){}
  
  openDialog(): void 
  {
    const dialogRef = this.dialog.open(LoginComponent, 
    {
      width: '30%',
    });
    
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(result => 
    {
      console.log('The dialog was closed !!!!!!');
    });
  }

  isUserLoggedIn()
  {
    return this.authenticationService.isUserLoggedIn();
  }
  
  accessibleByRole(role)
  {
    return this.authenticationService.checkRoleAccessibility(role);
  }
  
  logout(): void
  {
    this.authenticationService.logout(); 
    this.router.navigate(['/home']);
  }

}
