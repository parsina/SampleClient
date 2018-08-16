import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageBox} from '../../utils/messagebox';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit
{
  token: string;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog)
  {
    console.log("Constructing !");
  }

  ngOnInit()
  {
    this.route.queryParams.subscribe(params =>
    {
      this.token = params['token'];
    });

    this.userService.confirmRegistration(this.token)
      .subscribe(data =>
        {
          const result = JSON.parse(JSON.stringify(data));
          let title = 'تایید ثبت نام';
          let message;
          let info;

          if(result.success)
          {
            message = 'با عرض تبریک';
            info = 'حساب کاربری شما فعال گردید.';
          }
          else
          {
            message = 'خطا در فعال سازی حساب';
            info = result.message;
          }

          MessageBox.show(this.dialog, message, title, info, 0, false, 1, '30%')
            .subscribe(results =>
            {
              console.log(results);
              this.router.navigate(['/home']);
            });
        },
        error =>
        {
          // this.success = false;
          // this.message = "Failed to activate user. Exception in token or URL !";
          console.log("Failed !!");
        });
  }
}
