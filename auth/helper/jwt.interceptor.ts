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
  constructor(private dataStorage: DataStorage)
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

    this.dataStorage.showLoader();

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
          this.dataStorage.hideLoader();
        }, () =>
        {
          this.dataStorage.hideLoader();
        })
      );
  }
}
