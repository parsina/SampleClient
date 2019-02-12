import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {BitrixService} from '../../../service/bitrix.service';


export class TransactionDatasource implements DataSource<any>
{

  private transactionSubject = new BehaviorSubject<any[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading = this.loadingSubject.asObservable();

  constructor(private bitrixService: BitrixService)
  {
  }

  loadTransactions(filter: string, sortDirection: string, sortBy: string, pageIndex: number, pageSize: number)
  {
    this.loadingSubject.next(true);

    this.bitrixService.getTransactions(filter, sortDirection, sortBy, pageIndex, pageSize)
      .pipe(
        catchError(() =>
          of([])),
        finalize(() =>
          this.loadingSubject.next(false)))
      .subscribe(data =>
        {
          this.transactionSubject.next(data.properties.transactions);
        }
      );

  }

  connect(collectionViewer: CollectionViewer): Observable<any>
  {
    return this.transactionSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void
  {
    this.transactionSubject.complete();
    this.loadingSubject.complete();
  }
}
