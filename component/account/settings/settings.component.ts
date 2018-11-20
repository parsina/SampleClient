import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {AuthenticationService} from '../../../service/authentication.service';
import {MessageBox} from '../../../utils/messagebox';
import {MatDialog} from '@angular/material';

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

  constructor(private authService: AuthenticationService, private dialog: MatDialog, private userService: UserService)
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
                let title = 'تغییر کلمه عبور';
                let message = 'کلمه عبور شما با موفقیت تغییر کرد';
                MessageBox.show(this.dialog, message, title, '', 0, false, 1, '30%')
                  .subscribe(results =>
                  {
                    this.password = '';
                    this.newPassword = '';
                    this.newPasswordRepeat = '';
                  });
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
          let title = 'ارتباط با پشتیبانی';
          let message = 'با تشکر از ارتباط شما با پشتیبانی';
          let information = 'موضوع ارسالی شما بزودی بررسی و نتیجه به ایمیل شما ارسال می گردد.';
          MessageBox.show(this.dialog, message, title, information, 0, false, 1, '30%')
            .subscribe(results =>
            {
              this.subject = '';
              this.description = '';
            });
        }
        else
          this.supportError = data.message;
      });
  }
}
