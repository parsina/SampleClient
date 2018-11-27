import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {FormService} from '../service/form.service';
import {catchError, finalize} from 'rxjs/operators';
// @ts-ignore
import {Form} from '../model/Form';


export class FormHistoryDataSource implements DataSource<Form>
{

  private FormSubject = new BehaviorSubject<Form[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading = this.loadingSubject.asObservable();

  constructor(private formService: FormService)
  {
  }

  loadForms(formTemplateId: number, formType: string, filter: string, sortDirection: string, sortBy: string, pageIndex: number, pageSize: number)
  {
    this.loadingSubject.next(true);

    this.formService.getFormList(formTemplateId, formType, filter, sortDirection, sortBy, pageIndex, pageSize)
      .pipe(
        catchError(() =>
          of([])),
        finalize(() =>
          this.loadingSubject.next(false)))
      .subscribe(data =>
        this.FormSubject.next(data.properties.forms));

  }

  connect(collectionViewer: CollectionViewer): Observable<Form[]>
  {
    return this.FormSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void
  {
    this.FormSubject.complete();
    this.loadingSubject.complete();
  }
}
