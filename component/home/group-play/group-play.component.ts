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

  formTemplateList: any[];
  dataSource: MatTableDataSource<any>;
  selectedFormTemplateId: number;
  selectedFormTemplateName: string;
  formTemplateId: number;
  formTemplateStatus: string;
  @Input() source: any;

  constructor(private formService: FormService)
  {
    this.dataSource = new MatTableDataSource();
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

    this.source.addEventListener('message', message =>
    {
      this.dataSource.data.splice(0, this.dataSource.data.length);
      const matchData = this.dataSource.data;
      for (let i = 0; i < JSON.parse(message.data).properties.matches.length; i++)
      {
        this.formTemplateId = JSON.parse(message.data).properties.matches[i].properties.formTemplateId;
        if (this.selectedFormTemplateId == this.formTemplateId)
          matchData.push(JSON.parse(message.data).properties.matches[i]);
      }
      if (matchData.length > 0)
        this.dataSource.data = matchData;
    });
  }

  changeFormTemplate()
  {
    this.formService.getFormTemplateData(this.selectedFormTemplateId).subscribe(data =>
    {
      this.selectedFormTemplateName = data.properties.name;
      this.formTemplateStatus = data.properties.status;
      this.dataSource.data = data.properties.matches;
    });
  }

  downloadPhotoCal()
  {
    this.formService.downloadPhotoCal(this.selectedFormTemplateId, this.selectedFormTemplateName);
  }
}
