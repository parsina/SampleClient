import {Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {FormService} from '../../service/form.service';
import { ViewEncapsulation } from '@angular/core';
import {ajax} from 'rxjs/ajax';
import {ajaxGet} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{
  encapsulation: ViewEncapsulation.None
  displayedColumns: string[] = ['index', 'date', 'time', 'league', 'homeCountry', 'homeCountryFlag', 'homeName', 'homeLogo', 'liveScore', 'awayLogo', 'awayName', 'awayCountryFlag', 'awayCountry'];
  formList: any[];
  dataSource: MatTableDataSource<any>;
  counter: number = 0;
  formId: number;
  formName: string;
  formNumber: number;
  formScore: number;
  formValue: number;
  formType: string;

  foods: any[] =
    [
      {value: 'steak-0', viewValue: 'Steak'},
      {value: 'pizza-1', viewValue: 'Pizza'},
      {value: 'tacos-2', viewValue: 'Tacos'}
    ];

  constructor(private formService: FormService, private dialog: MatDialog)
  {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit()
  {
    this.formService.getFormTemplates().subscribe(data =>
    {
      this.formList = data;
      for(let i =0; i < this.formList.length; i++)
        this.formList[i].properties.name = "فرم شماره " + this.formList[i].properties.name;
      if (this.formList.length > 0)
      {
        this.formId = this.formList[0].properties.id;
        this.formService.getFormTemplateData(this.formId).subscribe(formData =>
        {
          this.formName = formData.name;
          this.formValue = formData.value;
          this.formNumber = formData.number;
          this.formScore = formData.score;
          this.formType = formData.type;
          this.dataSource.data = formData.properties.matches;
        });
      }
    });


  }

  change()
  {
    this.formService.getFormTemplateData(this.formId).subscribe(data =>
    {
      this.dataSource.data = data.properties.matches;
    });
  }


  selectHomeWinCheckbox(element: any)
  {
    let id = element.properties.id;
    let checked = !element.properties.homeWin;
    if (checked)
      this.counter++;
    else
      this.counter--;

    for (let i = 0; i < this.dataSource.data.length; i++)
      if (this.dataSource.data[i].properties.id === id)
        this.dataSource.data[i].properties.homeWin = checked;

    console.log(this.counter);
  }

  selectNoWinCheckbox(element: any)
  {
    let id = element.properties.id;
    let checked = !element.properties.noWin;
    if (checked)
      this.counter++;
    else
      this.counter--;

    for (let i = 0; i < this.dataSource.data.length; i++)
      if (this.dataSource.data[i].properties.id === id)
        this.dataSource.data[i].properties.noWin = checked;

    console.log(this.counter);
  }

  selectAwayWinCheckbox(element: any)
  {
    let id = element.properties.id;
    let checked = !element.properties.awayWin;
    if (checked)
      this.counter++;
    else
      this.counter--;

    for (let i = 0; i < this.dataSource.data.length; i++)
      if (this.dataSource.data[i].properties.id === id)
        this.dataSource.data[i].properties.awayWin = checked;

    console.log(this.counter);
  }
}
