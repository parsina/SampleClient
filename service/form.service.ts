import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpParams} from '../../../node_modules/@angular/common/http';
import {BehaviorSubject, observable, Observable} from 'rxjs';
import {DataStorage} from '../auth/data.storage';

@Injectable({
  providedIn: 'root'
})


export class FormService
{
  emitterData:any;
  constructor(private http: HttpClient, private dataStorage: DataStorage)
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
    return this.http.get('//localhost:8090/form/formTemplateData', {params: params});
  }

  updateFromTemplate():any
  {
    if(!this.emitterData)
      this.emitterData = new EventSource('//localhost:8090/form/updateFormTemplate');
    return this.emitterData;
  }

  getTotalPassedFormTemplateSize():Observable<any>
  {
    return this.http.get('//localhost:8090/form/totalPassedFromTemplates');
  }

  getTotalPassedFormTemplate(filter = '', sortOrder = 'asc', sortBy = 'id', pageNumber = 0, pageSize = 10): Observable<any>
  {
    return this.http.post('//localhost:8090/form/passedFromTemplates', {'filter': filter, 'sortOrder': sortOrder, 'sortBy': sortBy, 'pageNumber': pageNumber, 'pageSize': pageSize});
  }

  getTemplateFormsSize(formTemplateId: any):Observable<any>
  {
    const params = new HttpParams().set("formTemplateId",formTemplateId);
    return this.http.get('//localhost:8090/form/templateFormsSize', {params: params});
  }

  getTemplateForms(formTemplateId: any, filter = '', sortOrder = 'asc', sortBy = 'id', pageNumber = 0, pageSize = 10): Observable<any>
  {
    return this.http.post(`//localhost:8090/form/templateForms`, {'formTemplateId': formTemplateId, filter , sortOrder, sortBy, pageNumber, pageSize});
  }

  // Private Access Endpoints
  // ==================================================================================================================================

  getOpenFormTemplates(): Observable<any>
  {
    return this.http.get('//localhost:8090/form/openFormTemplates');
  }

  createForm(formData:any, formTemplateId:any): Observable<any>
  {
    return this.http.post(`//localhost:8090/form/createForm`, {'formData': formData, 'userId': this.dataStorage.getJsonData().userId, 'formTemplateId' : formTemplateId});
  }

  updateForm(formData:any, formId:any): Observable<any>
  {
    return this.http.post(`//localhost:8090/form/updateForm`, {'formData': formData, 'userId': this.dataStorage.getJsonData().userId, 'formId' : formId});
  }

  getFixtureData(): Observable<any>
  {
    return this.http.get('//localhost:8090/form/fixtureData');
  }

  getUserForms(formType:string, filter = '', sortOrder = 'asc', sortBy = 'id', pageNumber = 0, pageSize = 10): Observable<any>
  {
    return this.http.post('//localhost:8090/form/userForms', {'formType': formType, 'filter': filter, 'sortOrder': sortOrder, 'sortBy': sortBy, 'pageNumber': pageNumber, 'pageSize': pageSize});
  }

  getUserTotalFormsSize(formType:string):Observable<any>
  {
    const params = new HttpParams().set("formType",formType);
    return this.http.get('//localhost:8090/form/userFormsCount', {params: params});
  }

  getUserFormData(formId: any): Observable<any>
  {
    return this.http.post('//localhost:8090/form/getUserFormData', {'formId': formId});
  }

  getPassedUserFormData(formId: any): Observable<any>
  {
    return this.http.post('//localhost:8090/form/getPassedFormData', {'formId': formId});
  }

  // No Access Endpoints
  // ==================================================================================================================================

  createFormTemplate(ids:any, formTemplateType:string): Observable<any>
  {
    return this.http.post(`//localhost:8090/form/createFormTemplate`, {'ids': ids, 'type': formTemplateType});
  }
}
