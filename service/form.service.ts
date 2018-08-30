import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpParams} from '../../../node_modules/@angular/common/http';
import {BehaviorSubject, observable, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService
{
  private source;

  getSource() : any
  {
    return this.source;
  }

  constructor(private http: HttpClient, private zone:NgZone)
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

  getFormTemplateData(id:number):Observable<any>
  {
    const params = new HttpParams().set("id",String(id));
    let observable = this.http.get('//localhost:8090/formTemplateData', {params: params});
    this.source = new EventSource('//localhost:8090/updateFormTemplate?id=' + id);
    return observable;
  }

  createFormTemplate(ids:any): Observable<any>
  {
    return this.http.post(`//localhost:8090/createFormTemplate`, {'ids': ids});
  }
}
