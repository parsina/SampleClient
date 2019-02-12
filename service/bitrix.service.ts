import {Injectable} from '@angular/core';
import {User} from '../auth/model/user';
import {HttpClient} from '../../../node_modules/@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {DataStorage} from '../auth/data.storage';
import {MatSnackBar} from '@angular/material';
import {MatSnackBarRef} from '../../../node_modules/@angular/material/snack-bar/typings/snack-bar-ref';
import {SimpleSnackBar} from '../../../node_modules/@angular/material/snack-bar/typings/simple-snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BitrixService
{
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private dataStorage: DataStorage, private snackBar: MatSnackBar)
  {
  }

  authenticateReferee(referee: string): Observable<any>
  {
    return this.http.post<any>(this.baseUrl + 'bitrix/authenticateReferee/', {referee: referee});
  }

  login(email: string, password: string): Observable<any>
  {
    return this.http.post<any>(this.baseUrl + 'bitrix/login/', {email: email, password: password});
  }

  signup(username: string, email: string, password: string, referee: string): Observable<any>
  {
    return this.http.post<any>(this.baseUrl + 'bitrix/signup/', {username: username, email: email, password: password, referee: referee});
  }

  resendVerification(email: string): Observable<any>
  {
    return this.http.post<any>(this.baseUrl + 'bitrix/resendVerification/', {email: email});
  }

  confirmVerification(token: string)
  {
    return this.http.post(this.baseUrl + 'bitrix/confirmVerification/', {'token': token});
  }

  forgotPassword(email: string): Observable<any>
  {
    return this.http.post<any>(this.baseUrl + 'bitrix/forgotPassword/', {email: email});
  }

  getTransactionsSize(): Observable<any>
  {
    return this.http.post(this.baseUrl + 'bitrix/transactionsSize', {});
  }

  getTransactions(filter = '', sortOrder = 'asc', sortBy = 'updateDate', pageNumber = 0, pageSize = 10): Observable<any>
  {
    return this.http.post(this.baseUrl + 'bitrix/transactions', {filter, sortOrder, sortBy, pageNumber, pageSize});
  }

  getUserAccountData(): Observable<any>
  {
    return this.http.post(this.baseUrl + 'bitrix/userAccountData', {});
  }

  sendBitcoins(userId, address, amount, userSecurityCode): Observable<any>
  {
    return this.http.post(this.baseUrl + 'bitrix/sendBitcoin', {
      userId: userId,
      address: address,
      amount: amount,
      userSecurityCode: userSecurityCode
    });
  }

  sendSecurityCodeEmail(userId): Observable<any>
  {
    return this.http.post(this.baseUrl + 'bitrix/sendCodeForWithdrawal', {userId: userId});
  }

  activateNode(): Observable<any>
  {
    return this.http.post(this.baseUrl + 'bitrix/activateNode', {});
  }

  logout()
  {
    this.http.post(this.baseUrl + 'bitrix/logout/', {user: this.dataStorage.getUserJsonData()});
    this.dataStorage.signOut();
  }

  completeMatrix(): Observable<any>
  {
    return this.http.post(this.baseUrl + 'bitrix/completeMatrix', {});
  }

  startNewPlan(): Observable<any>
  {
    return this.http.post(this.baseUrl + 'bitrix/startNewPlan', {});
  }

  findUserChildren(): Observable<any>
  {
    return this.http.post(this.baseUrl + 'bitrix/findUserChildren', {});
  }

  changeUserPassword(currentPassword: string, newPassword: string, repeatedNewPassword: string): Observable<any>
  {
    return this.http.post<any>(this.baseUrl + 'bitrix/changeUserPassword', {
      currentPassword: currentPassword,
      newPassword: newPassword,
      repeatedNewPassword: repeatedNewPassword
    });
  }

  notify(type: string, message: string) : MatSnackBarRef<SimpleSnackBar>
  {
    return this.snackBar.open(message, 'X',
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass:[type]
      });
  }
}
