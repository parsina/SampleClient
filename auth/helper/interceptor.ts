import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {DataStorage} from '../data.storage';
import {Observable} from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor
{

  constructor(private dataStorage: DataStorage, private router: Router)
  {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any>
  {
    let authReq = req;
    if (this.dataStorage.getUserStringData() != null)
    {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.dataStorage.getUserStringData())});
    }

    return next.handle(authReq);
  }

}
