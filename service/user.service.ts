import {User} from '../auth/model/user';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataStorage} from '../auth/data.storage';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class UserService
{
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private dataStorage:DataStorage)
  {
  }

  register(user: User)
  {
    return this.http.post(this.baseUrl + 'auth/signUp/', {username: user.username, email:user.email, pass: user.password, reppass: user.repeatedPassword});
  }

  sendActivationEmail(email: string)
  {
    return this.http.post(this.baseUrl + 'auth/sendActivationLink/', {'email': email});
  }

  sendInvitationEmails(emails: string[]):Observable<any>
  {
    return this.http.post(this.baseUrl + 'auth/sendInvitations/', {'emails': emails});
  }

  confirmRegistration(token: string)
  {
    return this.http.post(this.baseUrl + 'auth/confirmActivationToken/', {'token': token});
  }

  getUserAccount():Observable<any>
  {
    return this.http.post(this.baseUrl + 'account/userAccount/', {});
  }

  getTransactionsSize():Observable<any>
  {
    return this.http.post('//localhost:8090/account/accountTransactionsSize', {});
  }

  getTransactions(filter = '', sortOrder = 'asc', sortBy = 'updateDate', pageNumber = 0, pageSize = 10):Observable<any>
  {
    return this.http.post(this.baseUrl + 'account/accountTransactions', {filter , sortOrder, sortBy, pageNumber, pageSize});
  }

  sendSecurityCodeEmail(userId):Observable<any>
  {
    return this.http.post(this.baseUrl + 'account/sendCodeForWithdrawal', {userId: userId});
  }

  sendCoinsToUser(userId, address, amount, userSecurityCode):Observable<any>
  {
    return this.http.post(this.baseUrl + 'account/withdrawFromUserAccount', {userId: userId, address: address, amount: amount, userSecurityCode: userSecurityCode});
  }

  getCountries():Observable<any>
  {
    return this.http.post(this.baseUrl + 'confirm/countries/', {});
  }

  saveCountry(key, value)
  {
    return this.http.post(this.baseUrl + 'confirm/saveCountry/', {key: key, value:value});
  }

  getLeagues():Observable<any>
  {
    return this.http.post(this.baseUrl + 'confirm/leagues/', {});
  }

  saveLeague(key, value)
  {
    return this.http.post(this.baseUrl + 'confirm/saveLeague/', {key: key, value:value});
  }

  getTeams():Observable<any>
  {
    return this.http.post(this.baseUrl + 'confirm/teams/', {});
  }

  saveTeam(key, value)
  {
    return this.http.post(this.baseUrl + 'confirm/saveTeam/', {key: key, value:value});
  }

  getUserData(): Observable<any>
  {
    return this.http.post(this.baseUrl + 'auth/userAccountData', {});
  }

  updateUserAccountBalance()
  {
    this.getUserAccount().subscribe(data => {
      this.dataStorage.updateUserAccountBalance(data.properties.balance);
    });
  }
}
