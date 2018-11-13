import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WinnerService
{
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient)
  {
  }

  getWinnerListSize(formTemplateId: any): Observable<any>
  {
    return this.http.post(this.baseUrl + 'winner/winnerListSize', {formTemplateId: formTemplateId});
  }

  getWinnerList(formTemplateId: any, filter = '', sortOrder = 'asc', sortBy = 'id', pageNumber = 0, pageSize = 10): Observable<any>
  {
    return this.http.post(this.baseUrl + 'winner/winnerList', {
      formTemplateId: formTemplateId,
      filter,
      sortOrder,
      sortBy,
      pageNumber,
      pageSize
    });
  }
}
