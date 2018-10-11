import {Injectable} from '@angular/core';

@Injectable()
export class DataStorage
{

  constructor()
  {
  }

  signOut()
  {
    window.sessionStorage.removeItem('userData');
    window.sessionStorage.removeItem('accountData');
    window.sessionStorage.removeItem('bitCoinValue');
    window.sessionStorage.clear();
  }

  public saveLoggedInUserData(data: any)
  {
    window.sessionStorage.setItem('userData', JSON.stringify({userId: data.id, username: data.username, email:data.email, userRole: data.role, userInfo: data.info, token: data.token}));
  }

  public saveLoggedInUserAccountData(data: any)
  {
    window.sessionStorage.setItem('accountData', JSON.stringify({address: data.walletAddress, balance:data.balance, realBalance:data.realBalance}));
  }

  public saveBitCoinValue(value: any)
  {
    window.sessionStorage.setItem('bitCoinValue', JSON.stringify({value: value}));
  }

  public getUserJsonData(): any
  {
    return window.sessionStorage.getItem('userData') === null ? null : JSON.parse(window.sessionStorage.getItem('userData'));
  }

  public getUserStringData(): any
  {
    return window.sessionStorage.getItem('userData');
  }

  public getUserAccountJsonData(): any
  {
    return window.sessionStorage.getItem('accountData') === null ? null : JSON.parse(window.sessionStorage.getItem('accountData'));
  }

  public getUserAccountStringData(): any
  {
    return window.sessionStorage.getItem('accountData');
  }

  public getBitCoinValue(): any
  {
    return window.sessionStorage.getItem('bitCoinValue') === null ? null : JSON.parse(window.sessionStorage.getItem('bitCoinValue'));
  }

  public getBitCoinValueAsNumber(): number
  {
    let bitcoinValue:number;
    let value = this.getBitCoinValue() == null ? null : this.getBitCoinValue().value;
    if(value == null || value.trim() === '' || value.length == 0)
      return null;
    let str: string = '';
    for (let i = 0; i < value.split(",").length; i++)
      str += value.split(',')[i];
    bitcoinValue = +str;
    return bitcoinValue;
  }
}
