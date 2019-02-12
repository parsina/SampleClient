import {Component, OnInit} from '@angular/core';
import {BitrixService} from '../../../service/bitrix.service';
import {Router} from '@angular/router';
import {DataStorage} from '../../../auth/data.storage';

@Component({
  selector: 'app-login-rix',
  templateUrl: './login-rix.component.html',
  styleUrls: ['./login-rix.component.css']
})
export class LoginRixComponent implements OnInit
{
  constructor(private bitrixService: BitrixService,
              private dataStorage: DataStorage,
              private router: Router)
  {
  }

  ngOnInit()
  {
  }

  login(email, password)
  {
    this.bitrixService.notify('success', '').dismiss();
    if (!email)
    {
      this.bitrixService.notify('error', 'Please enter your email.');
      return;
    }

    if (!password)
    {
      this.bitrixService.notify('error', 'Please enter your password.');
      return;
    }

    this.bitrixService.login(email, password).subscribe(result =>
    {
      if (result.success)
      {
        this.dataStorage.saveLoggedInUserData(result.properties.user, true);
        this.router.navigate(['/Home']);
      }
      else
        this.bitrixService.notify('error', result.message);

    });
  }

  forgotPassword(email)
  {
    this.bitrixService.notify('success', '').dismiss();
    if (!email)
      this.bitrixService.notify('error', 'Please enter your email address.');
    else
      this.bitrixService.forgotPassword(email).subscribe(result =>
      {
        this.bitrixService.notify('success', result.message);
      });
  }
}
