import {Injectable} from '@angular/core';
import {ProgressLoaderComponent} from '../component/progress-loader/progress-loader.component';
import {MatDialog, MatDialogRef} from '@angular/material';

@Injectable()
export class DataStorage
{
  loading: boolean = false;
  dialogRef: MatDialogRef<ProgressLoaderComponent>;

  constructor(private loadingDialog: MatDialog)
  {
  }

  signOut()
  {
    window.localStorage.removeItem('userData');
    window.localStorage.removeItem('accountData');
    window.localStorage.removeItem('bitCoinValue');
    window.localStorage.clear();
  }

  public saveLoggedInUserData(data: any)
  {
    window.localStorage.setItem('userData', JSON.stringify({
      userId: data.id,
      username: data.username,
      email: data.email,
      userRole: data.role,
      userInfo: data.info,
      token: data.token
    }));
  }

  public saveLoggedInUserAccountData(data: any)
  {
    window.localStorage.setItem('accountData', JSON.stringify({walletAddress: data.walletAddress, balance: data.balance}));
  }

  public saveBitCoinValue(value: any)
  {
    window.localStorage.setItem('bitCoinValue', JSON.stringify({value: value}));
  }

  public getUserJsonData(): any
  {
    return window.localStorage.getItem('userData') === null ? null : JSON.parse(window.localStorage.getItem('userData'));
  }

  public getUserStringData(): any
  {
    return window.localStorage.getItem('userData');
  }

  public getUserAccountJsonData(): any
  {
    return window.localStorage.getItem('accountData') === null ? null : JSON.parse(window.localStorage.getItem('accountData'));
  }

  public updateUserAccountBalance(balance)
  {
    let data = JSON.parse(window.localStorage.getItem('accountData'));
    data.balance = balance;
    this.saveLoggedInUserAccountData(data);
  }

  public getUserAccountStringData(): any
  {
    return window.localStorage.getItem('accountData');
  }

  public getBitCoinValue(): any
  {
    return window.localStorage.getItem('bitCoinValue') === null ? null : JSON.parse(window.localStorage.getItem('bitCoinValue'));
  }

  public getBitCoinValueAsNumber(): number
  {
    let bitcoinValue: number;
    let value = this.getBitCoinValue() == null ? null : this.getBitCoinValue().value;
    if (value == null || value.trim() === '' || value.length == 0)
      return null;
    let str: string = '';
    for (let i = 0; i < value.split(",").length; i++)
      str += value.split(',')[i];
    bitcoinValue = +str;
    return bitcoinValue;
  }

  public getValueAsNumber(value:string): number
  {
    let numberValue: number;
    if (value == null || value.trim() === '' || value.length == 0)
      return null;
    let str: string = '';
    for (let i = 0; i < value.split(",").length; i++)
      str += value.split(',')[i];
    numberValue = +str;
    return numberValue;
  }

  showLoader(): void
  {
    setTimeout(() =>
    {
      if (!this.loading)
      {
        this.loading = true;
        this.dialogRef = this.loadingDialog.open(ProgressLoaderComponent, {panelClass: 'custom-dialog-container'});
        this.dialogRef.disableClose = true;
      }
    });
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
