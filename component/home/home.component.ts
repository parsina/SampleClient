import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {FormService} from '../../service/form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
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

  formList: any[];
  dataSource: MatTableDataSource<any>;
  formId: number;
  formTemplateId: number;
  formName: string;
  formValue: number = 100;

  constructor(private formService: FormService)
  {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit()
  {
    this.formService.getFormTemplates().subscribe(data =>
    {
      this.formList = data;
      for (let i = 0; i < this.formList.length; i++)
        this.formList[i].properties.name = 'فرم شماره ' + this.formList[i].properties.name;
      if (this.formList.length > 0)
      {
        this.formId = this.formList[0].properties.id;
        this.formService.getFormTemplateData(this.formId).subscribe(data =>
        {
          this.formName = data.properties.name;
          this.formValue = data.properties.value;
          this.dataSource.data = data.properties.matches;
        });

        let source = this.formService.updateFromTemplate();
        source.addEventListener('message', message =>
        {
          this.dataSource.data.splice(0, this.dataSource.data.length);
          const data = this.dataSource.data;
          for (let i = 0; i < JSON.parse(message.data).properties.matches.length; i++)
          {
            this.formTemplateId = JSON.parse(message.data).properties.matches[i].properties.formTemplateId;
            if (this.formId == this.formTemplateId)
              data.push(JSON.parse(message.data).properties.matches[i]);
          }
          this.dataSource.data = data;
        });
      }
    });
  }

  changeForm()
  {
    this.formService.getFormTemplateData(this.formId).subscribe(data =>
    {
      this.dataSource.data = data.properties.matches;
    });
  }
}
