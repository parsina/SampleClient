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
import {first} from 'rxjs/operators';

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
  error = '';

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog)
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

//      this.loginForm = this.formBuilder.group({
//            username: ['', [Validators.required, EmailValidator.validEmail]],
//            password: ['', Validators.required]
//        });
//
//        this.registerForm = this.formBuilder.group({
//            username: ['', [Validators.required, EmailValidator.validEmail]],
//            password: ['', [Validators.required, PasswordValidator.strong]],
//            repeatedPassword: ['', Validators.required]
//        },
//        {
//          validator: PasswordValidator.match.bind(this)
//        });

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
    this.authenticationService.login(this.lForm.username.value, this.lForm.password.value)
      .pipe(first())
      .subscribe(
        data =>
        {
          this.dialogRef.close();
          this.router.navigate([this.returnUrl]);
        },
        error =>
        {
          this.error = error;
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
      .subscribe(
        data =>
        {

          const result = JSON.parse(JSON.stringify(data));
          if (result.success)
          {
            let title = "ثبت نام";
            let message = "ثبت نام شما با موفقیت انجام گردید.";
            let info = "تا چند دقیقه دیگر، لینک فعال سازی به آدرس ایمیل شما ارسال خواهد شد.";
            MessageBox.show(this.dialog, message, title, info, 0, false, 1, '30%')
              .subscribe(results =>
              {
                console.log(results);
              });

          }
          else
          {
            alert('NOk');
          }

          this.router.navigate(['/home']);
        },
        error =>
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
