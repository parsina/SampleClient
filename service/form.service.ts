import {Injectable} from '@angular/core';
import {HttpClient} from '../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService
{
  constructor(private http: HttpClient)
  {
  }

  getMatchesData(): Observable<any>
  {
    return this.http.get('//localhost:8090/matchData');
  }

  getFormTemplates(): Observable<any>
  {
    return this.http.get('//localhost:8090/formTemplates');
  }

  getFormTemplateData(id:number): Observable<any>
  {
    return this.http.post('//localhost:8090/formTemplateData', {'id': id});
  }

  createForm(ids:any): Observable<any>
  {
    return this.http.post(`//localhost:8090/createForm`, {'ids': ids});
  }

  loadMatches(): Observable<any>
  {
    return this.http.get(`//localhost:8090/loadMatches`);
  }
}
