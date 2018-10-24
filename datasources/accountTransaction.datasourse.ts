import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {FormService} from '../service/form.service';
import {catchError, finalize} from 'rxjs/operators';
import {UserForm} from '../model/userForm';
import {UserService} from '../service/user.service';


export class AccountTransactionDataSource implements DataSource<any>
{

  private accountTransactionSubject = new BehaviorSubject<any[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading = this.loadingSubject.asObservable();

  constructor(private userService: UserService)
  {
  }

  loadAccountTransactions(filter: string, sortDirection: string, sortBy: string, pageIndex: number, pageSize: number)
  {
    this.loadingSubject.next(true);

    this.userService.getTransactions(filter, sortDirection, sortBy, pageIndex, pageSize)
      .pipe(
        catchError(() =>
          of([])),
        finalize(() =>
          this.loadingSubject.next(false)))
      .subscribe(data =>
        this.accountTransactionSubject.next(data.properties.transactions));

  }

  connect(collectionViewer: CollectionViewer): Observable<any>
  {
    return this.accountTransactionSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void
  {
    this.accountTransactionSubject.complete();
    this.loadingSubject.complete();
  }
}
