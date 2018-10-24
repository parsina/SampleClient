import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {FormService} from '../../../service/form.service';
import {DataStorage} from '../../../auth/data.storage';
import {UserService} from '../../../service/user.service';

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
      'datetime',
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
  selectedFormTemplateStatus: string;
  selectedFormTemplateType: string;
  @Input() source: any;

  constructor(private formService: FormService,
              private userService: UserService,
              private dataStorage: DataStorage)
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
        this.changeFormTemplate(this.selectedFormTemplateId);
      }
    });

    this.source.addEventListener('message', message =>
    {
      this.dataSource.data.splice(0, this.dataSource.data.length);
      const matchData = this.dataSource.data;
      for (let i = 0; i < JSON.parse(message.data).properties.matches.length; i++)
      {
        if (this.selectedFormTemplateId == JSON.parse(message.data).properties.matches[i].properties.formTemplateId)
          matchData.push(JSON.parse(message.data).properties.matches[i]);
      }
      if (matchData.length > 0)
        this.dataSource.data = matchData;
    });
  }

  changeFormTemplate(id)
  {
    this.selectedFormTemplateId = id;
    this.formService.getFormTemplateData(this.selectedFormTemplateId).subscribe(data =>
    {
      this.selectedFormTemplateName = data.properties.name;
      this.selectedFormTemplateStatus = data.properties.status;
      this.selectedFormTemplateType = data.properties.type;
      this.dataSource.data = data.properties.matches;
    });
  }

  downloadPhotoCal()
  {
    this.formService.downloadPhotoCal(this.selectedFormTemplateId, this.selectedFormTemplateName);
  }
}
