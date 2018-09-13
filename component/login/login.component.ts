import {AuthenticationService} from '../../service/authentication.service';
import {UserService} from '../../service/user.service';
import {MessageBox} from '../../utils/messagebox';
import {EmailValidator} from '../../validator/email.validator';
import {PasswordValidator} from '../../validator/password.validator';
import {SimpleDialogComponent} from '../simple-dialog/simple-dialog.component';
import {Component, OnInit, Inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {first, map} from 'rxjs/operators';
import {DataStorage} from '../../auth/data.storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  loginForm: FormGroup;
  registerForm: FormGroup;
  loading = false;
  loginSubmitted = false;
  registerSubmitted = false;
  returnUrl: string;
  loginError = '';
  registerError = '';

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private dataStorage: DataStorage)
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
      password: [''],
      repeatedPassword: ['']
    });

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, EmailValidator.validEmail]],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required, EmailValidator.validEmail]],
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

    this.loading = true;
    this.authenticationService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(data =>
      {
        const result = JSON.parse(JSON.stringify(data));
        if (result.success)
        {
          // store username and jwt dataStorage in local storage to keep user logged in between page refreshes
          this.dataStorage.saveData(data.properties);
          this.dialogRef.close();
          this.router.navigate([this.returnUrl]);
        }
        else
        {
          this.loginError = result.message;
          this.loading = false;
        }
      },error =>
      {
        this.loginError = error;
        this.loading = false;
      });
  }

  onRegister()
  {
    this.registerSubmitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid)
    {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(data =>
        {
          let title = 'ثبت نام';
          let message;
          let info = 'تا چند دقیقه دیگر، لینک فعال سازی به آدرس ایمیل شما ارسال خواهد شد.';

          const result = JSON.parse(JSON.stringify(data));
          if (result.success)
          {
            message = 'ثبت نام شما با موفقیت انجام گردید.';
            MessageBox.show(this.dialog, message, title, info, 0, false, 1, '30%')
              .subscribe(results =>
              {
                this.userService.sendActivationEmail(result.properties.userEmail)
                  .subscribe(
                    result =>
                    {
                      console.log('Send !!!!');
                      this.router.navigate(['/crypto-home']);
                    },
                    errors =>
                    {
                      console.log('Error !!!!');
                    });
              });
          }
          else
          {
            message = 'خطا در ثبت نام';
            MessageBox.show(this.dialog, message, title, result.message, 0, false, 1, '30%')
              .subscribe(results =>
              {
                console.log(results);
              });
          }
        },error =>
        {
//                    this.alertService.error(error);
          alert('Error');
          this.loading = false;
        });
    this.closeDialog();
  }

  closeDialog(): void
  {
    this.dialog.closeAll();
  }
}
