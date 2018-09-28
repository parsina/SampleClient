import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {FormService} from '../service/form.service';
import {catchError, finalize} from 'rxjs/operators';
// @ts-ignore
import {Form} from '../model/Form';
import {UserService} from '../service/user.service';
import {WinnerService} from '../service/winner.service';


export class WinnerDataSource implements DataSource<any>
{

  private WinnerSubject = new BehaviorSubject<any[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading = this.loadingSubject.asObservable();

  constructor(private winnerService: WinnerService)
  {
  }

  loadWinners(formTemplateId: number, filter: string, sortDirection: string, sortBy: string, pageIndex: number, pageSize: number)
  {
    this.loadingSubject.next(true);

    this.winnerService.getWinnerList(formTemplateId, filter, sortDirection, sortBy, pageIndex, pageSize)
      .pipe(
        catchError(() =>
          of([])),
        finalize(() =>
          this.loadingSubject.next(false)))
      .subscribe(data =>
        this.WinnerSubject.next(data.properties.winners));

  }

  connect(collectionViewer: CollectionViewer): Observable<Form[]>
  {
    return this.WinnerSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void
  {
    this.WinnerSubject.complete();
    this.loadingSubject.complete();
  }
}
