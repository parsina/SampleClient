import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AccountTransactionDataSource} from '../../../datasources/accountTransaction.datasourse';
import {UserService} from '../../../service/user.service';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DataStorage} from '../../../auth/data.storage';
import {CurrencyPipe} from '../../../utils/pipes/currency.pipe';
import {MessageBox} from '../../../utils/messagebox';
import {ngCopy} from 'angular-6-clipboard';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit, AfterViewInit
{
  address: string;
  forwardAddress: string;
  balance: number;
  accessibleBalance: number;
  amount: string;
  securityCode: boolean;
  userSecurityCode: string;

  transactionDataSource: AccountTransactionDataSource;
  transactionSize: number;

  transactionsColumns: string[] =
    [
      'index',
      'updateDate',
      'type',
      'value',
      'fee',
      'description',
      'status'
    ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataStorage: DataStorage,
              private dialog: MatDialog,
              private userService: UserService,
              private currencyPipe: CurrencyPipe,
              private readonly notifier: NotifierService)
  {
  }

  ngOnInit()
  {
    this.transactionDataSource = new AccountTransactionDataSource(this.userService);
    this.loadTransactions();
    this.resetData();
  }

  ngAfterViewInit()
  {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(tap(() => this.loadTransactions())).subscribe();
  }

  resetData()
  {
    this.address = this.dataStorage.getUserAccountJsonData().walletAddress;
    this.balance = this.dataStorage.getUserAccountJsonData().balance;
    this.accessibleBalance = this.balance - (1000 + this.balance * 0.005);
    if (this.accessibleBalance < 0)
      this.accessibleBalance = 0;
    this.amount = '';
    this.securityCode = false;
    this.userSecurityCode = undefined;
    this.forwardAddress = undefined;
  }

  copyToClipboard()
  {
    ngCopy(this.address);
    this.notifier.notify('info', 'آدرس کیف پول الکترونیک شما کپی گردید.');
  }

  setAmount(value: string)
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
    if (!this.checkTransferData())
      return;
    this.notifier.notify('info', 'کد امنیتی به آدرس ایمیل شما ارسال گردید. لطفا به ایمیل خود مراجعه نمایید و کد ارسال شده را در کادر مربوطه درج نمایید.');
    this.userService.sendSecurityCodeEmail(this.dataStorage.getUserJsonData().userId).subscribe(data =>
    {
      this.securityCode = true;
    });
  }

  // 2NGZrVvZG92qGYqzTLjCAewvPZ7JE8S8VxE
  sendCoins()
  {
    if (!this.checkTransferData())
      return;

    let fee = 1000 + (this.dataStorage.getValueAsNumber(this.amount) * 0.005);

    let title = 'ارسال مبلغ';
    let message = 'ارسال مبلغ ' + this.currencyPipe.transform(this.amount) + ' ساتوشی به آدرس ' + this.forwardAddress;
    let info = 'کارمزد این تراکنش : ' + this.currencyPipe.transform(fee + '') + ' ساتوشی';


    MessageBox.show(this.dialog, message, title, info, 2, false, 1, '30%')
      .subscribe(results =>
      {
        if (results.result === 'yes')
        {
          this.userService.sendCoinsToUser(this.dataStorage.getUserJsonData().userId, this.forwardAddress, this.dataStorage.getValueAsNumber(this.amount), this.userSecurityCode).subscribe(data =>
          {
            if (data.success)
            {
              this.notifier.notify('success', 'مبلغ ' + this.currencyPipe.transform(this.amount) + ' ساتوشی به آدرس ' + this.forwardAddress + ' ارسال گردید.');
              this.notifier.notify('info', 'به طور معمول تراکنش ها در شبکه بلاک چین، در مدت کوتاهی انجام می شوند. ولی با توجه به ترافیک شبکه بلاک چین در ساعات مختلف روز، ممکن است انجام اینگونه تراکنش ها از چند دقیقه تا چند ساعت متغیر باشد. در صورتیکه پس از 3 ساعت، تراکنش انجام نشد، با پشتیبانی سایت تماس بگیرید.');
              this.dataStorage.updateUserAccountBalance(data.properties.balance);
              this.resetData();
              this.loadTransactions();
            }
            else
            {
              this.notifier.notify('error', 'کد امنیتی صحیح نمی باشد.');
              this.notifier.notify('info', 'لطفا به ایمیل خود مراجعه نمایید و کد ارسال شده را در کادر مربوطه درج نمایید. در صورت نیاز، دوباره بر روی دکمه ارسال کد امنیتی کلیک کنید تا کد امنیتی جدید به ایمیل شما ارسال گردد.');
            }
          });
        }
      });
  }

  checkTransferData(): boolean
  {
    if (!this.amount)
    {
      this.notifier.notify('error', 'لطفا مبلغ مورد نطر خود را وارد نمایید.');
      return false;
    }

    if (this.dataStorage.getValueAsNumber(this.amount) < 20000)
    {
      this.notifier.notify('error', 'مبلغ وارد شده کمتر از 20،000 ساتوشی می باشد.');
      return false;
    }

    if (this.dataStorage.getValueAsNumber(this.amount) > this.accessibleBalance)
    {
      this.notifier.notify('error', 'مبلغ وارد شده بیشتر از موجودی قابل برداشت می باشد.');
      return false;
    }

    if (!this.forwardAddress)
    {
      this.notifier.notify('error', 'لطفا آدرس مقصد را وارد نمایید.');
      return false;
    }
    return true;
  }

  loadTransactions()
  {
    this.userService.getTransactionsSize().subscribe(count => this.transactionSize = count);
    this.transactionDataSource.loadAccountTransactions('',
      this.sort ? this.sort.direction : 'asc',
      this.sort ? this.sort.active : 'updateDate',
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 10);
  }

  getTransactionType(type): string
  {
    if (type === 'DEPOSIT')
      return 'واریز';
    else if (type === 'COST')
      return 'شرکت در مسابقه';
    else if (type === 'INCOME')
      return 'جایزه';
    else if (type === 'GIFT')
      return 'پاداش';
    else if (type === 'WITHDRAWAL')
      return 'برداشت';
    else if (type === 'FORWARD')
      return 'انتقال';
  }

  getTransactionColor(type): string
  {
    if (type === 'DEPOSIT')
      return 'text-align: center;color:green';
    else if (type === 'COST')
      return 'text-align: center;color:red';
    else if (type === 'INCOME')
      return 'text-align: center;color:green';
    else if (type === 'GIFT')
      return 'text-align: center;color:yellow';
    else if (type === 'WITHDRAWAL')
      return 'text-align: center;color:red';
    else if (type === 'FORWARD')
      return 'text-align: center;color:black';
  }
}
