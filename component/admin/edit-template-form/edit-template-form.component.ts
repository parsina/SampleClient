import {Component, OnInit, ViewChild} from '@angular/core';
import {FormService} from '../../../service/form.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MessageBox} from '../../../utils/messagebox';
import {FormsDatasourse} from '../../../datasources/formsDatasourse';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-edit-template-form',
  templateUrl: './edit-template-form.component.html',
  styleUrls: ['./edit-template-form.component.css']
})
export class EditTemplateFormComponent implements OnInit
{
  displayedColumns: string[] =
    [
      'index',
      'date',
      'time',
      'league',
      // 'homeCountry',
      // 'homeCountryFlag',
      'homeName',
      'homeLogo',
      'liveScore',
      'awayLogo',
      'awayName',
      // 'awayCountryFlag',
      // 'awayCountry',
      'minute',
      'status'
    ];

  formsColumns: string[] =
    [
      'index',
      'username',
      'name',
      'createdDate',
      'value',
      'score',
      'real'
    ];

  selectedFormTemplateId: number;
  formTemplateList: any[];
  dataSource: MatTableDataSource<any>;
  selectedFormTemplateName: string;
  formTemplateId: number;
  formTemplateStatus: string;
  formType: string = 'All';
  totalFormsSize: number;
  forms: FormsDatasourse;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formService: FormService, private dialog: MatDialog)
  {
    this.dataSource = new MatTableDataSource();
    this.forms = new FormsDatasourse(this.formService);
  }

  ngOnInit()
  {
    this.formService.getFormTemplates().subscribe(data =>
    {
      this.formTemplateList = data;
      if (this.formTemplateList.length > 0)
      {
        this.selectedFormTemplateId = this.formTemplateList[0].properties.id;
        this.selectedFormTemplateName = this.formTemplateList[0].properties.name;
        this.changeFormTemplate();
      }
    });
  }

  ngAfterViewInit()
  {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(tap(() => this.changeFormTemplate())).subscribe();
  }

  changeFormTemplate()
  {
    this.formService.getFormTemplateData(this.selectedFormTemplateId).subscribe(data =>
    {
      this.selectedFormTemplateName = data.properties.name;
      this.selectedFormTemplateId = data.properties.id;
      this.formTemplateStatus = data.properties.status;
      this.dataSource.data = data.properties.matches;
      this.changeFormType();
    });
  }


  removeFormTemplate()
  {
    let title = 'حذف مسابقه';
    let message = this.selectedFormTemplateName + ' حذف بشه ؟';
    let info = 'formTemplateId: ' + this.selectedFormTemplateId;

    MessageBox.show(this.dialog, message, title, info, 1, false, 1, '30%')
      .subscribe(results =>
      {
        if (results.result == 'ok')
        {
          this.formService.deleteFormTemplate(this.selectedFormTemplateId).subscribe(result =>
          {
            this.formService.getFormTemplates().subscribe(data =>
            {
              this.formTemplateList = data;
              if (this.formTemplateList.length > 0)
              {
                this.selectedFormTemplateId = this.formTemplateList[0].properties.id;
                this.selectedFormTemplateName = this.formTemplateList[0].properties.name;
                this.changeFormTemplate();
              }
            });
          });
        }
      });
  }

  changeFormType()
  {
    this.formService.getTotalFormsSize(this.selectedFormTemplateId, this.formType, 'All').subscribe(count =>
      this.totalFormsSize = count
    );
    this.forms.loadForms(this.selectedFormTemplateId, this.formType, 'All', '',
      this.sort ? this.sort.direction : 'asc', this.sort ? this.sort.active : 'createdDate',
      this.paginator.pageIndex, this.paginator.pageSize);
  }

}


