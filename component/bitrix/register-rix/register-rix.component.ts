import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BitrixService} from '../../../service/bitrix.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-register-rix',
  templateUrl: './register-rix.component.html',
  styleUrls: ['./register-rix.component.css']
})
export class RegisterRixComponent implements OnInit
{
  referee: string;
  reference: string;
  success: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private bitrixService: BitrixService)
  {
  }

  ngOnInit()
  {
    this.route.queryParams.subscribe(params =>
    {
      this.referee = params['ref'];
    });

    if (!this.referee)
      this.router.navigate(['/Login']);
    this.bitrixService.authenticateReferee(this.referee).subscribe(result =>
    {
      if(!result.success)
        this.router.navigate(['/Login']);
      this.reference = result.properties.reference;
    });
  }

  signup(username, email, password, repeatedPassword)
  {
    if (!email)
    {
      this.bitrixService.notify('error', 'Please enter a username.');
      return;
    }

    if (!email)
    {
      this.bitrixService.notify('error', 'Please enter your email.');
      return;
    }

    if (!password)
    {
      this.bitrixService.notify('error', 'Please enter a password with minimum 8 characters and containing at least one uppercase, one lowercase and one number.');
      return;
    }

    if (password !== repeatedPassword)
    {
      this.bitrixService.notify('error', 'Please confirm the passwords are the same.');
      return;
    }

    this.bitrixService.signup(username, email, password, this.referee).subscribe(result =>
    {
      this.success = result.success;
      if (result.success)
        this.bitrixService.notify('success', result.message);
      else
        this.bitrixService.notify('error', result.message);
    });
  }

  resendVerification(email)
  {
    this.bitrixService.resendVerification(email).subscribe(data => {
      if(data.success)
        this.bitrixService.notify('success', data.message);

    });
  }
}
