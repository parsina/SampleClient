import {Component, OnInit} from '@angular/core';
import {DataStorage} from '../../../auth/data.storage';
import {MessageBox} from '../../../utils/messagebox';
import {ngCopy} from 'angular-6-clipboard';
import {MatDialog} from '@angular/material';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit
{
  address: string;
  forwardAddress: string;
  balance: number;
  accessibleBalance: number;
  amount:string;
  securityCode:string;
  userSecurityCode:string;

  constructor(private dataStorage: DataStorage, private dialog: MatDialog, private userService:UserService)
  {
  }

  ngOnInit()
  {
    this.address = this.dataStorage.getUserAccountJsonData().walletAddress;
    this.balance = this.dataStorage.getUserAccountJsonData().balance;
    this.accessibleBalance = this.balance - (this.balance * 0.005);
    this.amount = '';
    this.forwardAddress = 'mrqT1J9UeDv3EttTpDL2N6oi1y5ZRW9NuK';
  }

  copyToClipboard()
  {
    ngCopy(this.address);
    let title = 'کپی';
    let message = 'آدرس کیف پول الکترونیک شما کپی گردید.';
    let info = '';
    MessageBox.show(this.dialog, message, title, info, 0, false, 1, '30%')
      .subscribe(results =>
      {
      });
  }

  setAmount(value:string)
  {
    const reg = new RegExp('^[0-9]+(,[0-9]+)*$');
    if (value === '' || !reg.test(value))
    {
      value = '';
    }
    this.amount = value;
  }

  sendSecurityCode()
  {
    this.userService.sendSecurityCodeEmail(this.dataStorage.getUserJsonData().userId).subscribe(data =>
    {
      this.securityCode = data.properties.securityCode;
    });
  }

  // 2NGZrVvZG92qGYqzTLjCAewvPZ7JE8S8VxE
  sendCoins()
  {
    this.userService.sendCoinsToUser(this.dataStorage.getUserJsonData().userId, this.forwardAddress, this.dataStorage.getValueAsNumber(this.amount), this.securityCode, this.userSecurityCode).subscribe(data =>
    {
      this.dataStorage.updateUserAccountBalance(data.properties.balance);
    });
  }
}
