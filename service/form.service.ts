import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpParams} from '../../../node_modules/@angular/common/http';
import {BehaviorSubject, observable, Observable} from 'rxjs';
import {DataStorage} from '../auth/data.storage';
import {MatSlideToggle} from '@angular/material';

@Injectable({
  providedIn: 'root'
})


export class FormService
{
  emitterData: any;

  constructor(private http: HttpClient, private dataStorage: DataStorage)
  {
  }

  // Public Access Endpoints
  // ==================================================================================================================================
  getFormTemplates(): Observable<any>
  {
    return this.http.get('//localhost:8090/form/formTemplates');
  }

  getFormTemplateData(id: number): Observable<any>
  {
    const params = new HttpParams().set('id', String(id));
    return this.http.get('//localhost:8090/form/formTemplateData', {params: params});
  }

  updateFromTemplate(): any
  {
    if (!this.emitterData)
      this.emitterData = new EventSource('//localhost:8090/form/updateFormTemplate');
    return this.emitterData;
  }

  getTotalPassedFormTemplateSize(challengeType: string): Observable<any>
  {
    const params = new HttpParams().set('challengeType', challengeType);
    return this.http.get('//localhost:8090/form/totalPassedFromTemplates', {params: params});
  }

  getTotalPassedFormTemplate(challengeType = 'ALL', filter = '', sortOrder = 'asc', sortBy = 'id', pageNumber = 0, pageSize = 10): Observable<any>
  {
    return this.http.post('//localhost:8090/form/passedFormTemplates', {
      'challengeType': challengeType,
      'filter': filter,
      'sortOrder': sortOrder,
      'sortBy': sortBy,
      'pageNumber': pageNumber,
      'pageSize': pageSize
    });
  }

  getFormListSize(formTemplateId: any): Observable<any>
  {
    const params = new HttpParams().set('formTemplateId', formTemplateId);
    return this.http.get('//localhost:8090/form/formListSize', {params: params});
  }

  getFormList(formTemplateId: any, filter = '', sortOrder = 'asc', sortBy = 'id', pageNumber = 0, pageSize = 10): Observable<any>
  {
    return this.http.post(`//localhost:8090/form/formList`, {
      'formTemplateId': formTemplateId,
      filter,
      sortOrder,
      sortBy,
      pageNumber,
      pageSize
    });
  }

  downloadPhotoCal(formTemplateId: number, formTemplateName: string)
  {
    // this.http.get('../assets/photoCalendar/' + fileName, {responseType: 'blob'})
    const params = new HttpParams().set('formTemplateId', String(formTemplateId));
    this.http.get('//localhost:8090/form/downloadPhotoCal', {params: params, responseType: 'blob'}).subscribe((blob: Blob) =>
    {
      console.log('report is downloaded');
      let link = document.createElement('a');
      if (link.download !== undefined)
      {
        let url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'فتوکل ' + formTemplateName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      else
      {
        //html5 download not supported
      }
    });
  }

  // Private Access Endpoints
  // ==================================================================================================================================

  getOpenFormTemplates(): Observable<any>
  {
    return this.http.get('//localhost:8090/form/openFormTemplates');
  }

  createForm(formData: any, formTemplateId: any, real: boolean): Observable<any>
  {
    return this.http.post(`//localhost:8090/form/createForm`, {
      'formData': formData,
      'userId': this.dataStorage.getUserJsonData().userId,
      'formTemplateId': formTemplateId,
      'real': real
    });
  }

  updateForm(formData: any, formId: any, real: boolean): Observable<any>
  {
    return this.http.post(`//localhost:8090/form/updateForm`, {
      'formData': formData,
      'userId': this.dataStorage.getUserJsonData().userId,
      'formId': formId,
      'real': real
    });
  }

  getFixtureData(): Observable<any>
  {
    return this.http.get('//localhost:8090/form/fixtureData');
  }

  loadFixtures(): Observable<any>
  {
    return this.http.get('//localhost:8090/form/loadFixturesData');
  }

  deleteFormTemplate(id): Observable<any>
  {
    return this.http.post('//localhost:8090/form/deleteFormTemplate', {'formTemplateId': id});
  }

  deleteUserForm(id): Observable<any>
  {
    return this.http.post('//localhost:8090/form/deleteUserForm', {'formId': id});
  }

  getActiveFinalizeFormsData(formTemplateId: number, filter = '', sortOrder = 'asc', sortBy = 'createdDate', pageNumber = 0, pageSize = 10): Observable<any>
  {
    return this.http.post('//localhost:8090/form/finalizeFormsData', {
      'templateId': formTemplateId,
      'filter': filter,
      'sortOrder': sortOrder,
      'sortBy': sortBy,
      'pageNumber': pageNumber,
      'pageSize': pageSize
    });
  }

  getActiveFinalizeTotalFormsSize(formTemplateId: number): Observable<any>
  {
    return this.http.post('//localhost:8090/form/finalizeFormsCount', {templateId: formTemplateId});
  }

  getUserForms(formType: string, filter = '', sortOrder = 'asc', sortBy = 'id', pageNumber = 0, pageSize = 10): Observable<any>
  {
    return this.http.post('//localhost:8090/form/userForms', {
      'formType': formType,
      'filter': filter,
      'sortOrder': sortOrder,
      'sortBy': sortBy,
      'pageNumber': pageNumber,
      'pageSize': pageSize
    });
  }

  getUserTotalFormsSize(formType: string): Observable<any>
  {
    const params = new HttpParams().set('formType', formType);
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

  createFormTemplate(ids: any, formTemplateType: string): Observable<any>
  {
    return this.http.post(`//localhost:8090/form/createFormTemplate`, {'ids': ids, 'type': formTemplateType});
  }
}
