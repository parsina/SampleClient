import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {BitrixService} from '../../../service/bitrix.service';
import {Router} from '@angular/router';
import {DataStorage} from '../../../auth/data.storage';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {TransactionDatasource} from '../datasource/transaction.datasource';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ChangePasswordRixComponent} from '../change-password-rix/change-password-rix.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit
{
  screenWidth: number;
  userData: any;
  nodePrice: number;
  accessibleBalance: number;
  amount: string;
  feeValue: string;
  forwardAddress: string;
  securityCode: boolean;
  userSecurityCode: string;
  transactionDataSource: TransactionDatasource;
  transactionSize: number;
  leftNodeData = {username: '', nodes: '', status: ''};
  rightNodeData = {username: '', nodes: '', status: ''};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  transactionsColumns: string[] =
    [
      'index',
      'updateDate',
      'type',
      'amount',
      'fee',
      'status',
      'description'
    ];

  constructor(private bitrixService: BitrixService,
              private dialog: MatDialog,
              private dataStorage: DataStorage,
              private router: Router)
  {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event)
  {
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth);
  }

  initializeData()
  {
    this.screenWidth = window.innerWidth;
    this.userData = this.dataStorage.getUserJsonData();
    this.nodePrice = 0.001;
    if (this.userData.plan === 'BRONZE')
      this.nodePrice = 0.005;
    else if (this.userData.plan === 'SILVER')
      this.nodePrice = 0.01;
    else if (this.userData.plan == 'GOLD')
      this.nodePrice = 0.02;

    this.leftNodeData.username = '';
    this.rightNodeData.username = '';

    this.bitrixService.findUserChildren().subscribe(data =>
    {
      if (data.properties.first)
      {
        this.leftNodeData.username = data.properties.first.username.split('_LEVEL_UP_')[0];
        this.leftNodeData.nodes = data.properties.first.nodes;
        this.leftNodeData.status = data.properties.first.status;
      }

      if (data.properties.second)
      {
        this.rightNodeData.username = data.properties.second.username.split('_LEVEL_UP_')[0];
        this.rightNodeData.nodes = data.properties.second.nodes;
        this.rightNodeData.status = data.properties.second.status;
      }

      this.accessibleBalance = this.userData.balance - (0.00001 + this.userData.balance * 0.005);
      if (this.accessibleBalance < 0)
        this.accessibleBalance = 0;
      this.loadTransactions();
    });
  }

  ngOnInit()
  {
    this.transactionDataSource = new TransactionDatasource(this.bitrixService);
    this.initializeData();
  }

  ngAfterViewInit()
  {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(tap(() => this.loadTransactions())).subscribe();
  }

  updateAccountData()
  {
    this.bitrixService.getUserAccountData().subscribe(data =>
    {
      this.dataStorage.saveLoggedInUserData(data.properties.user, false);
      this.initializeData();
    });
  }

  setAmount(value: string)
  {
    const reg = new RegExp('^[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$');
    if (value === '' || !reg.test(value))
    {
      value = '';
    }
    this.amount = value;
    this.feeValue = (0.00001 + (this.dataStorage.getValueAsNumber(this.amount) * 0.005)).toString();
  }

  sendSecurityCode()
  {
    this.bitrixService.notify('success', '').dismiss();
    if (!this.checkTransferData())
      return;
    this.bitrixService.notify('success', 'Security code email has been successfully delivered to ' + this.userData.email +
      '. If you can\'t see it in your Inbox within 5 minutes, please click on Send security code again. Please also check your junk folder.');
    this.bitrixService.sendSecurityCodeEmail(this.dataStorage.getUserJsonData().userId).subscribe(data =>
    {
      this.securityCode = true;
    });
  }

  resetBitcoinTransactionData()
  {
    this.amount = '';
    this.securityCode = false;
    this.userSecurityCode = undefined;
    this.forwardAddress = undefined;
  }

  sendCoins()
  {
    this.bitrixService.notify('success', '').dismiss();
    if (!this.checkTransferData())
      return;
    this.bitrixService.sendBitcoins(this.userData.userId, this.forwardAddress, this.dataStorage.getValueAsNumber(this.amount), this.userSecurityCode).subscribe(data =>
    {
      if (data.success)
      {
        this.bitrixService.notify('success', this.amount + ' BTC is sent to ' + this.forwardAddress + '.');
        this.updateAccountData();
        this.resetBitcoinTransactionData();
      }
      else
        this.bitrixService.notify('error', data.message);
    });
  }

  checkTransferData(): boolean
  {
    this.bitrixService.notify('success', '').dismiss();
    if (!this.amount)
    {
      this.bitrixService.notify('error', 'Please enter amount value.');
      return false;
    }

    if (this.dataStorage.getValueAsNumber(this.amount) < 0.0005)
    {
      this.bitrixService.notify('error', 'Amount is below the minimum (0.0005 BTC).');
      return false;
    }

    if (this.dataStorage.getValueAsNumber(this.amount) > this.accessibleBalance)
    {
      this.bitrixService.notify('error', 'Maximum amount exceeded from ' + this.accessibleBalance + ' BTC.');
      return false;
    }

    if (!this.forwardAddress)
    {
      this.bitrixService.notify('error', 'Please enter destination address.');
      return false;
    }
    return true;
  }

  activateNode()
  {
    this.bitrixService.notify('success', '').dismiss();
    if (this.userData.balance < this.nodePrice)
    {
      this.bitrixService.notify('error', 'Your account balance is not enough. You need ' + this.nodePrice + ' BTC to activate this level.');
      return;
    }

    this.bitrixService.activateNode().subscribe(result =>
    {
      if (result.success)
      {
        this.bitrixService.getUserAccountData().subscribe(data =>
        {
          this.dataStorage.saveLoggedInUserData(data.properties.user, false);
          this.userData = this.dataStorage.getUserJsonData();
          this.bitrixService.notify('success', result.message);
        });
      }
      else
        this.bitrixService.notify('error', result.message);
      this.updateAccountData();
    });
  }

  completeMatrix()
  {
    this.bitrixService.notify('success', '').dismiss();
    this.bitrixService.completeMatrix().subscribe(result =>
    {
      this.bitrixService.notify('success', 'Matrix on level ' + this.userData.step + ' is completed. You can now activate level ' + (this.userData.step + 1) + '.');
      this.updateAccountData();
    });
  }

  startNewPlan()
  {
    this.bitrixService.notify('success', '').dismiss();
    this.bitrixService.startNewPlan().subscribe(result =>
    {
      if (result.success)
      {
        this.updateAccountData();
        this.bitrixService.notify('success', 'Your plan is upgraded to ' + this.userData.plan + '.');
      }

    });
  }

  logout(): void
  {
    this.bitrixService.logout();
    this.router.navigate(['/Login']);
  }

  loadTransactions()
  {
    this.bitrixService.getTransactionsSize().subscribe(count => this.transactionSize = count);
    this.transactionDataSource.loadTransactions('',
      this.sort ? this.sort.direction : 'asc',
      this.sort ? this.sort.active : 'updateDate',
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 10);
  }

  changePasswordDialog()
  {
    const dialogRef = this.dialog.open(ChangePasswordRixComponent, {
      width: '400px',
      data: {username: this.userData.username, email: this.userData.email}
    });
  }

  copyToClipboard(type: string)
  {
    this.bitrixService.notify('success', '').dismiss();
    if(type === 'link')
    {
      let selBox = document.createElement('textarea');
      selBox.value = this.userData.refereeURL;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      this.bitrixService.notify('success', 'Your invitation link is copied to clipboard.');
    }
    else
    if(type === 'address')
    {
      let selBox = document.createElement('textarea');
      selBox.value = this.userData.address;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      this.bitrixService.notify('success', 'Your Bitcoin wallet address is copied to clipboard.');
    }
  }
}
