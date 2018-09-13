import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpParams} from '../../../node_modules/@angular/common/http';
import {BehaviorSubject, observable, Observable} from 'rxjs';
import {DataStorage} from '../auth/data.storage';

@Injectable({
  providedIn: 'root'
})
export class FormService
{
  constructor(private http: HttpClient, private zone:NgZone, private dataStorage: DataStorage)
  {
  }

  // Public Access Endpoints
  // ==================================================================================================================================
  getFormTemplates(): Observable<any>
  {
    return this.http.get('//localhost:8090/form/formTemplates');
  }

  getFormTemplateData(id:number):Observable<any>
  {
    const params = new HttpParams().set("id",String(id));
    let observable = this.http.get('//localhost:8090/form/formTemplateData', {params: params});
    return observable;
  }

  updateFromTemplate():any
  {
    return new EventSource('//localhost:8090/form/updateFormTemplate');
  }

  // Private Access Endpoints
  // ==================================================================================================================================

  createForm(formData:any, formTemplateId:any): Observable<any>
  {
    return this.http.post(`//localhost:8090/form/createForm`, {'formData': formData, 'userId': this.dataStorage.getJsonData().userId, 'formTemplateId' : formTemplateId});
  }

  getMatchesData(): Observable<any>
  {
    return this.http.get('//localhost:8090/form/matchData');
  }

  // No Access Endpoints
  // ==================================================================================================================================

  createFormTemplate(ids:any): Observable<any>
  {
    return this.http.post(`//localhost:8090/form/createFormTemplate`, {'ids': ids});
  }
}
