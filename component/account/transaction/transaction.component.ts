import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {AccountTransactionDataSource} from '../../../datasources/accountTransaction.datasourse';
import {UserService} from '../../../service/user.service';
import {MatPaginator, MatSort} from '@angular/material';
import {UserFormDataSource} from '../../../datasources/userform.datasource';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit, AfterViewInit
{
  transactionDataSource:AccountTransactionDataSource;
  transactionSize: number;

  transactionsColumns: string[] =
    [
      'index',
      'updatedDate',
      'updatedTime',
      'type',
      'value',
      'description',
      'status'
    ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService:UserService)
  {

  }

  ngOnInit()
  {
    this.transactionDataSource = new AccountTransactionDataSource(this.userService);
    this.loadTransactions();
  }

  ngAfterViewInit()
  {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(tap(() => this.loadTransactions())).subscribe();
  }

  loadTransactions()
  {
    this.userService.getTransactionsSize().subscribe(count => this.transactionSize = count);
    this.transactionDataSource.loadAccountTransactions('',
      this.sort ? this.sort.direction : 'asc',
        this.sort ? this.sort.active : 'id',
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 10);
  }

}
