import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  DoCheck,
  Injectable,
  OnChanges, OnDestroy,
  OnInit
} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataStorage} from '../data.storage';
import {AuthenticationService} from '../../service/authentication.service';
import {tap, timeout} from 'rxjs/operators';
import {ProgressLoaderComponent} from '../../component/progress-loader/progress-loader.component';
import {MatDialog, MatDialogRef} from '@angular/material';

@Injectable()
export class JwtInterceptor implements HttpInterceptor
{
  loading: boolean = false;
  dialogRef: MatDialogRef<ProgressLoaderComponent>;
  constructor(private dataStorage: DataStorage, private loadingDialog: MatDialog)
  {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    // add authorization header with jwt token if available
    let data = this.dataStorage.getUserJsonData();
    if (data && data.token)
    {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${data.token}`
        }
      });
    }

    setTimeout(() => this.showLoader());

    return next.handle(request)
      .pipe(
        tap(event =>
        {
          if (event instanceof HttpResponse)
          {
          }
        }, error =>
        {
          // // http response status code
          // console.log('----response----');
          // console.error('status code:');
          // console.error(error.status);
          // console.error(error.message);
          // console.log('--- end of response---');
          this.hideLoader();
        }, () =>
        {
          this.hideLoader();
        })
      );
  }

  showLoader(): void
  {
    if (!this.loading)
    {
      this.loading = true;
      this.dialogRef = this.loadingDialog.open(ProgressLoaderComponent, {panelClass: 'custom-dialog-container'});
      this.dialogRef.disableClose = true;
    }
  }

  hideLoader(): void
  {
    setTimeout(() =>
    {
      this.dialogRef.close();
      this.loading = false;
    });
  }
}
