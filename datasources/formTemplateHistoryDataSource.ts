import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {FormService} from '../service/form.service';
import {catchError, finalize} from 'rxjs/operators';
// @ts-ignore
import {FormTemplate} from '../model/FormTemplate';


export class FormTemplateHistoryDataSource implements DataSource<FormTemplate>
{

  private _FormTemplateSubject = new BehaviorSubject<FormTemplate[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading = this.loadingSubject.asObservable();

  constructor(private formService: FormService)
  {
  }

  loadFormTemplates(challengeType: string, filter: string, sortDirection: string, sortBy: string, pageIndex: number, pageSize: number)
  {
    this.loadingSubject.next(true);

    this.formService.getTotalPassedFormTemplate(challengeType, filter, sortDirection, sortBy, pageIndex, pageSize)
      .pipe(
        catchError(() =>
          of([])),
        finalize(() =>
          this.loadingSubject.next(false)))
      .subscribe(data =>
        this._FormTemplateSubject.next(data));

  }

  connect(collectionViewer: CollectionViewer): Observable<FormTemplate[]>
  {
    return this._FormTemplateSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void
  {
    this._FormTemplateSubject.complete();
    this.loadingSubject.complete();
  }


  getFormTemplateSubject(): BehaviorSubject<FormTemplate[]>
  {
    return this._FormTemplateSubject;
  }
}
