import {Injectable} from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse
} from '@angular/common/http';
import {Router} from '@angular/router';
import {DataStorage} from '../data.storage';
import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';

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

    // // wrap in delayed observable to simulate server api call
    // return of(null).pipe(mergeMap(() =>
    // {
    //   // authenticate
    //   if (req.url.endsWith('/users/authenticate') && req.method === 'POST')
    //   {
    //     if (req.body.selectedFormUsername === testUser.selectedFormUsername && req.body.password === testUser.password)
    //     {
    //       // if login details are valid return 200 OK with a fake jwt token
    //       let body = {
    //         id: testUser.id,
    //         selectedFormUsername: testUser.selectedFormUsername,
    //         firstName: testUser.firstName,
    //         lastName: testUser.lastName,
    //         token: 'fake-jwt-token'
    //       };
    //       return of(new HttpResponse({status: 200, body}));
    //     }
    //     else
    //     {
    //       // else return 400 bad request
    //       return throwError({error: {message: 'Username or password is incorrect'}});
    //     }
    //   }
    //
    //   // get users
    //   if (req.url.endsWith('/users') && req.method === 'GET')
    //   {
    //     // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
    //     if (req.headers.get('Authorization') === 'Bearer fake-jwt-token')
    //     {
    //       return of(new HttpResponse({status: 200, body: [testUser]}));
    //     }
    //     else
    //     {
    //       // return 401 not authorised if token is null or invalid
    //       return throwError({error: {message: 'Unauthorised'}});
    //     }
    //   }
    //
    //   // pass through any requests not handled above
    //   return next.handle(req);
    //
    // }))
    //
    // // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
    //   .pipe(materialize())
    //   .pipe(delay(500))
    //   .pipe(dematerialize());
  }

}
