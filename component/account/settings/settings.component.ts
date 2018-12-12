import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {AuthenticationService} from '../../../service/authentication.service';
import {MessageBox} from '../../../utils/messagebox';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit
{
  username: string;
  email: string;

  password: string;
  newPassword: string;
  newPasswordRepeat: string;
  passError: string;

  subject: string;
  description: string;
  supportError: string;

  constructor(private authService: AuthenticationService,
              private dialog: MatDialog,
              private userService: UserService,
              private readonly notifier: NotifierService)
  {
  }

  ngOnInit()
  {
    this.username = this.authService.getLoggedInUser(false).username;
    this.email = this.authService.getLoggedInUser(false).email;
  }

  updatePassword()
  {
    this.passError = '';
    if (!this.password || this.password === null || this.password.trim() === '')
      this.passError = 'putPass';
    else
    {
      this.authService.checkLoggedInUser(this.password).subscribe(checked =>
      {
        if (checked)
        {
          if (!this.newPassword || this.newPassword === null || this.newPassword.trim() === '')
            this.passError = 'putNewPass';
          else if (this.password.trim() === this.newPassword.trim())
            this.passError = 'equalNewOld';
          else if (!this.validatePassword(this.newPassword))
            this.passError = 'putNewPassErr';
          else if (!this.newPasswordRepeat || this.newPasswordRepeat === null || this.newPasswordRepeat.trim() === '')
            this.passError = 'putPassRep';
          else if (this.newPassword.trim() != this.newPasswordRepeat.trim())
            this.passError = 'putPassRepErr';
          else
            this.authService.changeUserPassword(this.newPassword.trim()).subscribe(data =>
            {
              if (data.success)
              {
                this.notifier.notify('success', 'کلمه عبور شما با موفقیت به روزرسانی گردید.');
                return;
              }
              else
                this.passError = data.message;
            });
        }
        else
          this.passError = 'putPassErr';
      });
    }

  }

  private validatePassword(pass): boolean
  {
    let hasNumber = /\d/.test(pass);
    let hasUpper = /[A-Z]/.test(pass);
    let hasLower = /[a-z]/.test(pass);
    let min = pass.length >= 8;
    return hasNumber && hasUpper && hasLower && min;
  }

  sendTicket()
  {
    this.supportError = "";
    if (!this.subject || this.subject === null || this.subject.trim() === '')
      this.supportError = 'subject';
    else if (!this.description || this.description === null || this.description.trim() === '')
      this.supportError = 'description';
    else
      this.userService.sendTicket(this.subject, this.description).subscribe(data =>
      {
        if(data.success)
        {
          this.notifier.notify('info', 'موضوع ارسالی شما بزودی بررسی و نتیجه به ایمیل شما ارسال می گردد.');
        }
        else
          this.supportError = data.message;
      });
  }
}
