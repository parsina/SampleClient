import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HomeComponent} from '../home/home.component';
import {NotifierService} from 'angular-notifier';
import {BitrixService} from '../../../service/bitrix.service';

export interface DialogData
{
  username: string;
  email: string;
}

@Component({
  selector: 'app-change-password-rix',
  templateUrl: './change-password-rix.component.html',
  styleUrls: ['./change-password-rix.component.css']
})

export class ChangePasswordRixComponent implements OnInit
{
  constructor(public dialogRef: MatDialogRef<HomeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private bitrixService: BitrixService)
  {
  }

  ngOnInit()
  {
  }

  changePassword(currentPassword, newPassword, repeatedNewPassword)
  {
    this.bitrixService.notify('success', '').dismiss();
    if (!currentPassword)
    {
      this.bitrixService.notify('error', 'Please enter your current pasword.');
      return;
    }

    if (!newPassword)
    {
      this.bitrixService.notify('error', 'Please enter a password with minimum 8 characters and containing at least one uppercase, one lowercase and one number.');
      return;
    }

    if (newPassword !== repeatedNewPassword)
    {
      this.bitrixService.notify('error', 'Please confirm the new passwords are the same.');
      return;
    }

    this.bitrixService.changeUserPassword(currentPassword, newPassword, repeatedNewPassword).subscribe(result =>
    {
      this.bitrixService.notify('success', '').dismiss();
      if (result.success)
        this.bitrixService.notify('success', result.message);
      else
        this.bitrixService.notify('error', result.message);
      this.dialogRef.close();
    });
  }
}
