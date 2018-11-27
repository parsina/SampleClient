import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {FormService} from '../service/form.service';
import {catchError, finalize} from 'rxjs/operators';
import {UserForm} from '../model/userForm';


export class FinalizeFormsDatasourse implements DataSource<UserForm>
{

  private finalizeFormsSubject = new BehaviorSubject<UserForm[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading = this.loadingSubject.asObservable();

  constructor(private formService: FormService)
  {
  }

  loadFinalizedForms(templateFormId: number, formType: string, filter: string, sortDirection: string, sortBy: string,pageIndex: number, pageSize: number)
  {
    this.loadingSubject.next(true);

    this.formService.getActiveFinalizeFormsData(templateFormId, formType, filter, sortDirection, sortBy, pageIndex, pageSize)
      .pipe(
        catchError(() =>
          of([])),
        finalize(() =>
          this.loadingSubject.next(false)))
      .subscribe(data =>
        this.finalizeFormsSubject.next(data.properties.forms));

  }

  connect(collectionViewer: CollectionViewer): Observable<UserForm[]>
  {
    return this.finalizeFormsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void
  {
    this.finalizeFormsSubject.complete();
    this.loadingSubject.complete();
  }
}
