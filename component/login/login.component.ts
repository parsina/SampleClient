import {AuthenticationService} from '../../service/authentication.service';
import {UserService} from '../../service/user.service';
import {MessageBox} from '../../utils/messagebox';
import {EmailValidator} from '../../validator/email.validator';
import {PasswordValidator} from '../../validator/password.validator';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import {first} from 'rxjs/operators';
import {DataStorage} from '../../auth/data.storage';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginSubmitted = false;
  registerSubmitted = false;
  returnUrl: string;
  loginError = '';
  resendInvitation: boolean = false;
  emailToResendActivation = '';

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private dataStorage: DataStorage,
    private readonly notifier: NotifierService)
  {
  }

  ngOnInit()
  {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });

    this.registerForm = this.formBuilder.group({
      username: [''],
      email: [''],
      password: [''],
      repeatedPassword: ['']
    });

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, EmailValidator.validEmail]],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        email: ['', [Validators.required, EmailValidator.validEmail]],
        password: ['', [Validators.required, PasswordValidator.strong]],
        repeatedPassword: ['', Validators.required]
      },
      {
        validator: PasswordValidator.match.bind(this)
      });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get lForm()
  {
    return this.loginForm.controls;
  }

  get rForm()
  {
    return this.registerForm.controls;
  }

  onLogin()
  {
    this.loginSubmitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid)
    {
      return;
    }

    this.authenticationService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(data =>
      {
        const result = JSON.parse(JSON.stringify(data));
        if (result.success)
        {
          // store selectedFormUsername and jwt dataStorage in local storage to keep user logged in between page refreshes
          this.dataStorage.saveLoggedInUserData(data.properties);
          this.userService.getUserAccount().subscribe(accountData =>
          {
            this.dataStorage.saveLoggedInUserAccountData(accountData.properties);
          });
          this.closeDialog();
          this.router.navigate([this.returnUrl]);
        }
        else
        {
          this.loginError = result.message;
          if(result.properties.reason == 'INVITED_USER')
          {
            this.resendInvitation = true;
            this.emailToResendActivation = this.loginForm.value.username
          }
        }
      }, error =>
      {
        this.loginError = error;
      });

    this.dataStorage.hideLoader();
  }

  onRegister()
  {
    this.registerSubmitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid)
    {
      return;
    }

    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(data =>
      {
        const result = JSON.parse(JSON.stringify(data));
        if (result.success)
        {
          this.sendActivationEmail(result.properties.userEmail, true);
        }
        else
        {
          this.notifier.notify("error", result.message);
        }
      });
    this.dataStorage.hideLoader();
  }

  resendActivationEmail()
  {
    this.sendActivationEmail(this.emailToResendActivation, false);
  }


  sendActivationEmail(email , withRegistration)
  {
    this.userService.sendActivationEmail(email)
      .subscribe(
        result =>
        {
          this.router.navigate(['/home']);
          if(withRegistration)
            this.notifier.notify("success", 'ثبت نام شما با موفقیت انجام و لینک فعال سازی به آدرس ایمیل شما ارسال گردید.');
          else
            this.notifier.notify("success", 'لینک فعال سازی به آدرس ایمیل شما ارسال گردید.');
          this.closeDialog();
        });
  }

  closeDialog(): void
  {
    this.dialog.closeAll();
  }

  forgotPassword()
  {
    let hasDot = /./.test(this.loginForm.value.username);
    let hasAt = /@/.test(this.loginForm.value.username);
    if (!hasDot && !hasAt)
      this.notifier.notify("error", 'لطفا ایمیل خود را به درستی وارد نمایید.');
    else this.authenticationService.forgotPassword(this.loginForm.value.username).subscribe(data =>
    {
      if (data.success)
        this.notifier.notify("info", 'کلمه عبور جدید به آدرس ایمیل شما ارسال گردید. لطفا پس از ورود به سامانه، کلمه عبور خود را تغییر دهید.');
      else
        this.notifier.notify("info", data.message);
    });

  }
}
