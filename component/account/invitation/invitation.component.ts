import {Component, OnInit} from '@angular/core';
import {forEach} from '../../../../../node_modules/@angular/router/src/utils/collection';
import {MessageBox} from '../../../utils/messagebox';
import {MatDialog} from '@angular/material';
import {UserService} from '../../../service/user.service';
import {NotifierService} from 'angular-notifier';

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

  constructor(private userService: UserService,
              private dialog: MatDialog,
              private readonly notifier: NotifierService)
  {
  }

  ngOnInit()
  {
  }

  sendInvitationEmail()
  {
    this.emailList = this.emails.split(',');

    this.userService.sendInvitationEmails(this.emailList).subscribe(data =>
    {
      if (data.properties.validEmails.length > 0)
        this.notifier.notify('success', (data.properties.validEmails.length == 1 ? 'دعوتنامه برای این ایمیل ارسال گردید: ' : 'دعوتنامه برای این ایمیل ها ارسال گردید: ') + data.properties.validEmails);

      if (data.properties.existEmails.length > 0)
        this.notifier.notify('info', (data.properties.existEmails.length == 1 ? 'دعوتنامه قبلا برای این ایمیل ارسال گردیده: ' : 'دعوتنامه قبلا برای این ایمیل ها ارسال گردیده: ') + data.properties.existEmails);

      if (data.properties.wrongEmails.length > 0)
        this.notifier.notify('error', (data.properties.wrongEmails.length == 1 ? 'این آدرس ایمیل صحیح نمی باشد: ' : 'این آدرس های ایمیل صحیح نمی باشند: ') + data.properties.wrongEmails);
      this.emails = data.properties.existEmails + (data.properties.wrongEmails.length > 0 ?  ',' + data.properties.wrongEmails : '');
    });
  }
}
