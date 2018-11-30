import {Component, OnInit} from '@angular/core';
import {forEach} from '../../../../../node_modules/@angular/router/src/utils/collection';
import {MessageBox} from '../../../utils/messagebox';
import {MatDialog} from '@angular/material';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit
{
  emails: string;
  emailList: string[];

  correctEmails: string[];
  wrongEmails: string[];

  constructor(private userService: UserService, private dialog: MatDialog)
  {
  }

  ngOnInit()
  {
  }

  sendInvitationEmail()
  {
    this.emailList = this.emails.split(',');
    let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.correctEmails = [];
    this.wrongEmails = [];
    for (let email of this.emailList)
    {
      if (regexp.test(String(email.trim()).toLowerCase()))
        this.correctEmails.push(email.trim());
      else
        this.wrongEmails.push(email.trim() + ' ');
    }

    if (this.wrongEmails.length > 0)
    {
      let title = 'خطا';
      let message = 'آدرس(های) زیر صحیح نمی باشند، و قبل از ارسال، باید تصحیح و یا حذف شوند:';
      // @ts-ignore
      MessageBox.show(this.dialog, message, title, this.wrongEmails, 0, false, 1, '30%')
        .subscribe(results =>
        {

        });
      return;
    }
    else
      this.userService.sendInvitationEmails(this.correctEmails).subscribe(data =>
      {
        // javad.farzaneh+user07@clui.com,javad.farzaneh+user08@clui.com,javad.farzaneh+user09@clui.com,javad.farzaneh+user10@clui.com
        let title = 'ارسال ایمیل';
        let message = 'دعوتنامه برای ایمیل های زیر ارسال گردید:';

        if(data.properties.validEmails.length > 0)
        {
          // @ts-ignore
          MessageBox.show(this.dialog, message, title, data.properties.validEmails, 0, false, 1, '30%')
            .subscribe(results =>
            {
              this.emailList = [];
              if (data.properties.existEmails.length > 0)
              {
                title = 'خطا';
                message = 'ایمیل های زیر قبلا دعوت شده اند:';

                MessageBox.show(this.dialog, message, title, data.properties.existEmails, 0, false, 1, '30%')
                  .subscribe(results =>
                  {
                    this.emailList = data.properties.existEmails;
                    if (data.properties.wrongEmails.length > 0)
                    {
                      title = 'خطا';
                      message = 'آدرس (های) زیر صحیح نمی باشند:';

                      MessageBox.show(this.dialog, message, title, data.properties.wrongEmails, 0, false, 1, '30%')
                        .subscribe(results =>
                        {
                        });
                    }
                  });
              }
            });
        }
        else
        if (data.properties.existEmails.length > 0)
        {
          title = 'خطا';
          message = 'ایمیل های زیر قبلا دعوت شده اند:';

          MessageBox.show(this.dialog, message, title, data.properties.existEmails, 0, false, 1, '30%')
            .subscribe(results =>
            {
              this.emailList = data.properties.existEmails;
              if (data.properties.wrongEmails.length > 0)
              {
                title = 'خطا';
                message = 'آدرس ایمیل های زیر صحیح نمی باشد:';

                MessageBox.show(this.dialog, message, title, data.properties.wrongEmails, 0, false, 1, '30%')
                  .subscribe(results =>
                  {
                  });
              }
            });
        }
        else
        if (data.properties.wrongEmails.length > 0)
        {
          title = 'خطا';
          message = 'آدرس ایمیل های زیر صحیح نمی باشد:';

          MessageBox.show(this.dialog, message, title, data.properties.wrongEmails, 0, false, 1, '30%')
            .subscribe(results =>
            {
            });
        }

      });
  }
}
