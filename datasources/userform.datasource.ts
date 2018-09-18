import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {FormService} from '../service/form.service';
import {catchError, finalize} from 'rxjs/operators';
import {UserForm} from '../model/userForm';


export class UserFormDataSource implements DataSource<UserForm>
{

  private userFormSubject = new BehaviorSubject<UserForm[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading = this.loadingSubject.asObservable();

  constructor(private formService: FormService)
  {

  }

  loadUserForms(formType: string, filter: string, sortDirection: string, sortBy: string,pageIndex: number, pageSize: number)
  {
    this.loadingSubject.next(true);

    this.formService.getUserForms(formType, filter, sortDirection, sortBy, pageIndex, pageSize)
      .pipe(
        catchError(() =>
          of([])),
        finalize(() =>
          this.loadingSubject.next(false)))
      .subscribe(data =>
        this.userFormSubject.next(data.properties.forms));

  }

  connect(collectionViewer: CollectionViewer): Observable<UserForm[]>
  {
    return this.userFormSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void
  {
    this.userFormSubject.complete();
    this.loadingSubject.complete();
  }
}
