import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {FormService} from '../../../service/form.service';

@Component({
  selector: 'app-group-play',
  templateUrl: './group-play.component.html',
  styleUrls: ['./group-play.component.css']
})
export class GroupPlayComponent implements OnInit
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
  @Input() source: any;

  constructor(private formService: FormService)
  {
    this.dataSource = new MatTableDataSource();
    // this.source = this.formService.updateFromTemplate();
    //this.initializeData();
  }

  initializeData()
  {
    this.formService.getFormTemplates().subscribe(data =>
    {
      this.formList = data;
      if (this.formList.length > 0)
      {
        this.formId = this.formList[0].properties.id;
        this.formService.getFormTemplateData(this.formId).subscribe(data =>
        {
          this.formName = data.properties.name;
          this.formValue = data.properties.value;
          this.dataSource.data = data.properties.matches;
        });
      }
    });

    this.source.addEventListener('message', message =>
    {
      this.dataSource.data.splice(0, this.dataSource.data.length);
      const matchData = this.dataSource.data;
      for (let i = 0; i < JSON.parse(message.data).properties.matches.length; i++)
      {
        this.formTemplateId = JSON.parse(message.data).properties.matches[i].properties.formTemplateId;
        if (this.formId == this.formTemplateId)
          matchData.push(JSON.parse(message.data).properties.matches[i]);
      }
      if (matchData.length > 0)
        this.dataSource.data = matchData;
    });
  }

  ngOnInit()
  {
    this.initializeData();
  }

  changeForm()
  {
    this.formService.getFormTemplateData(this.formId).subscribe(data =>
    {
      this.dataSource.data = data.properties.matches;
    });
  }
}
