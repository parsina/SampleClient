import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WinnerService
{
  constructor(private http: HttpClient)
  {
  }

  getWinnerListSize(formTemplateId: any):Observable<any>
  {
    const params = new HttpParams().set("formTemplateId",formTemplateId);
    return this.http.get('//localhost:8090/winner/winnerListSize', {params: params});
  }

  getWinnerList(formTemplateId: any, filter = '', sortOrder = 'asc', sortBy = 'id', pageNumber = 0, pageSize = 10): Observable<any>
  {
    return this.http.post(`//localhost:8090/winner/winnerList`, {'formTemplateId': formTemplateId, filter , sortOrder, sortBy, pageNumber, pageSize});
  }
}
