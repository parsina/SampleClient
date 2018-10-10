import {Component, OnInit} from '@angular/core';
import {FormService} from '../../../service/form.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {MessageBox} from '../../../utils/messagebox';

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

  selectedFormTemplateId: number;
  formTemplateList: any[];
  dataSource: MatTableDataSource<any>;
  selectedFormTemplateName: string;
  formTemplateId: number;
  formTemplateStatus: string;

  constructor(private formService: FormService, private dialog: MatDialog)
  {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit()
  {
    this.formService.getFormTemplates("").subscribe(data =>
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

  changeFormTemplate()
  {
    this.formService.getFormTemplateData(this.selectedFormTemplateId).subscribe(data =>
    {
      this.selectedFormTemplateName = data.properties.name;
      this.selectedFormTemplateId = data.properties.id;
      this.formTemplateStatus = data.properties.status;
      this.dataSource.data = data.properties.matches;
    });
  }


  removeFormTemplate()
  {
    let title = 'حذف مسابقه';
    let message = 'مسابقه' + this.selectedFormTemplateName + ' حذف بشه ؟';
    let info = 'formTemplateId: ' + this.selectedFormTemplateId;

    MessageBox.show(this.dialog, message, title, info, 1, false, 1, '30%')
      .subscribe(results =>
      {
        if(results.result == 'ok')
        {
          this.formService.deleteFormTemplate(this.selectedFormTemplateId).subscribe(result =>
          {
            this.selectedFormTemplateId = this.formTemplateList[0].properties.id;
            this.changeFormTemplate();
          });
        }
      });
  }
}


