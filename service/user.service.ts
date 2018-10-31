import {User} from '../auth/model/user';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpParams} from '../../../node_modules/@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserService
{

  constructor(private http: HttpClient)
  {
  }

  register(user: User)
  {
    return this.http.post(`//localhost:8090/auth/signUp/`, {username: user.username, email:user.email, pass: user.password, reppass: user.repeatedPassword});
  }

  sendActivationEmail(email: string)
  {
    return this.http.post(`//localhost:8090/auth/sendActivationLink/`, {'email': email});
  }

  confirmRegistration(token: string)
  {
    return this.http.post(`//localhost:8090/auth/confirmActivationToken/`, {'token': token});
  }

  getUserAccount():Observable<any>
  {
    return this.http.get(`//localhost:8090/account/userAccount/`);
  }

  getTransactionsSize():Observable<any>
  {
    return this.http.get('//localhost:8090/account/accountTransactionsSize');
  }

  getTransactions(filter = '', sortOrder = 'asc', sortBy = 'id', pageNumber = 0, pageSize = 10):Observable<any>
  {
    return this.http.post(`//localhost:8090/account/accountTransactions`, {filter , sortOrder, sortBy, pageNumber, pageSize});
  }

  sendSecurityCodeEmail(userId):Observable<any>
  {
    return this.http.post(`//localhost:8090/account/sendCodeForWithdrawal`, {userId: userId});
  }

  sendCoinsToUser(userId, address, amount, securityCode, userSecurityCode):Observable<any>
  {
    return this.http.post(`//localhost:8090/account/withdrawFromUserAccount`, {userId: userId, address: address, amount: amount, securityCode: securityCode, userSecurityCode: userSecurityCode});
  }

  getCountries():Observable<any>
  {
    return this.http.get(`//localhost:8090/confirm/countries/`);
  }

  saveCountry(key, value)
  {
    return this.http.post(`//localhost:8090/confirm/saveCountry/`, {key: key, value:value});
  }

  getLeagues():Observable<any>
  {
    return this.http.get(`//localhost:8090/confirm/leagues/`);
  }

  saveLeague(key, value)
  {
    return this.http.post(`//localhost:8090/confirm/saveLeague/`, {key: key, value:value});
  }

  getTeams():Observable<any>
  {
    return this.http.get(`//localhost:8090/confirm/teams/`);
  }

  saveTeam(key, value)
  {
    return this.http.post(`//localhost:8090/confirm/saveTeam/`, {key: key, value:value});
  }
}
