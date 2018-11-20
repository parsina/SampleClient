import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {DataStorage} from '../auth/data.storage';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class FormService
{
  baseUrl = environment.baseUrl;

  emitterData: any;

  constructor(private http: HttpClient, private dataStorage: DataStorage)
  {
  }

  // Public Access Endpoints
  // ==================================================================================================================================
  getFormTemplates(): Observable<any>
  {
    return this.http.post(this.baseUrl + 'form/formTemplates', {});
  }

  getFormTemplateData(id: number): Observable<any>
  {
    return this.http.post(this.baseUrl + 'form/formTemplateData', {id: id});
  }

  updateFromTemplate(): any
  {
    if (!this.emitterData)
      this.emitterData = new EventSource(this.baseUrl + 'form/updateFormTemplate');
    return this.emitterData;
  }

  getTotalPassedFormTemplateSize(challengeType: string): Observable<any>
  {
    return this.http.post(this.baseUrl + 'form/totalPassedFromTemplates', {challengeType: challengeType});
  }

  getTotalPassedFormTemplate(challengeType = 'ALL', filter = '', sortOrder = 'asc', sortBy = 'id', pageNumber = 0, pageSize = 10): Observable<any>
  {
    return this.http.post(this.baseUrl + 'form/passedFormTemplates', {
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
    return this.http.post(this.baseUrl + 'form/formListSize', {formTemplateId: formTemplateId});
  }

  getFormList(formTemplateId: any, filter = '', sortOrder = 'asc', sortBy = 'id', pageNumber = 0, pageSize = 10): Observable<any>
  {
    return this.http.post(this.baseUrl + `form/formList`, {
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
    const params = new HttpParams().set('formTemplateId', String(formTemplateId));
    this.http.get(this.baseUrl + 'form/downloadPhotoCal', {params: params, responseType: 'blob'}).subscribe((blob: Blob) =>
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
    return this.http.post(this.baseUrl + 'form/openFormTemplates', {});
  }

  createForm(formData: any, formTemplateId: any, real: boolean): Observable<any>
  {
    return this.http.post(this.baseUrl + `form/createForm`, {
      'formData': formData,
      'userId': this.dataStorage.getUserJsonData().userId,
      'formTemplateId': formTemplateId,
      'real': real
    });
  }

  updateForm(formData: any, formId: any, real: boolean): Observable<any>
  {
    return this.http.post(this.baseUrl + `form/updateForm`, {
      'formData': formData,
      'userId': this.dataStorage.getUserJsonData().userId,
      'formId': formId,
      'real': real
    });
  }

  getFixtureData(): Observable<any>
  {
    return this.http.post(this.baseUrl + 'form/fixtureData', {});
  }

  loadFixtures(): Observable<any>
  {
    return this.http.post(this.baseUrl + 'form/loadFixturesData', {});
  }

  deleteFormTemplate(id): Observable<any>
  {
    return this.http.post(this.baseUrl + 'form/deleteFormTemplate', {'formTemplateId': id});
  }

  deleteUserForm(id): Observable<any>
  {
    return this.http.post(this.baseUrl + 'form/deleteUserForm', {'formId': id});
  }

  getActiveFinalizeFormsData(formTemplateId: number, filter = '', sortOrder = 'asc', sortBy = 'createdDate', pageNumber = 0, pageSize = 10): Observable<any>
  {
    return this.http.post(this.baseUrl + 'form/finalizeFormsData', {
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
    return this.http.post(this.baseUrl + 'form/finalizeFormsCount', {templateId: formTemplateId});
  }

  getUserForms(formType: string, filter = '', sortOrder = 'asc', sortBy = 'id', pageNumber = 0, pageSize = 10): Observable<any>
  {
    return this.http.post(this.baseUrl + 'form/userForms', {
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
    return this.http.post(this.baseUrl + 'form/userFormsCount', {formType});
  }

  getUserFormData(formId: any): Observable<any>
  {
    return this.http.post(this.baseUrl + 'form/getUserFormData', {'formId': formId});
  }

  getPassedUserFormData(formId: any): Observable<any>
  {
    return this.http.post(this.baseUrl + 'form/getPassedFormData', {'formId': formId});
  }

  // No Access Endpoints
  // ==================================================================================================================================

  createFormTemplate(ids: any, formTemplateType: string): Observable<any>
  {
    return this.http.post(this.baseUrl + 'form/createFormTemplate', {'ids': ids, 'type': formTemplateType});
  }
}
