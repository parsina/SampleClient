import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormTemplateHistoryDataSource} from '../../../datasources/formTemplateHistoryDataSource';
import {FormService} from '../../../service/form.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';
import {FormHistoryDataSource} from '../../../datasources/formHistory.datasourse';

@Component({
  selector: 'app-group-play-history',
  templateUrl: './group-play-history.component.html',
  styleUrls: ['./group-play-history.component.css']
})
export class GroupPlayHistoryComponent implements OnInit
{
  formTemplateDataSource: FormTemplateHistoryDataSource;
  totalTemplateFormsSize: number;
  formDataSource: FormHistoryDataSource;
  totalFormsSize: number;
  selectedFormTemplate: any[];
  selectedFormTemplateIndex: number;
  selectedFormTemplateType: string;
  userFormDataSource:MatTableDataSource<any>;
  selectedForm: any[];
  selectedFormIndex: number;
  formType: string = "All";

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  formTemplateColumns: string[] =
    [
      'index',
      'name',
      'numberOfForms',
      'totalValue'
    ];

  formsColumns: string[] =
    [
      'index',
      'username',
      'name',
      'createdDate',
      'real',
      'value',
      'score'
    ];

  userFormColumns: string[] =
    [
      'index',
      'date',
      'league',
      // 'homeCountry',
      // 'homeCountryFlag',
      'homeName',
      'homeLogo',
      'homeWin',
      'noWin',
      'awayWin',
      'awayLogo',
      'awayName',
      // 'awayCountryFlag',
      // 'awayCountry',
      'matchScore',
      'score'
    ];

  constructor(private formService: FormService)
  {
    this.formTemplateDataSource = new FormTemplateHistoryDataSource(this.formService);
    this.formDataSource = new FormHistoryDataSource(this.formService);
    this.userFormDataSource = new MatTableDataSource();
  }

  ngOnInit()
  {
    // @ts-ignore
    this.formTemplateDataSource.paginator = this.paginator.toArray()[0];
    // @ts-ignore
    this.formTemplateDataSource.sort = this.sort.toArray()[0];

    // @ts-ignore
    this.formDataSource.paginator = this.paginator.toArray()[1];
    // @ts-ignore
    this.formDataSource.sort = this.sort.toArray()[1];
  }

  ngAfterViewInit()
  {
    this.changeFormTemplate();

    // reset the formTempalatePaginator after sorting
    this.sort.toArray()[0].sortChange.subscribe(() => this.paginator.toArray()[0].pageIndex = 0);
    merge(this.sort.toArray()[0].sortChange, this.paginator.toArray()[0].page).pipe(tap(() => this.changeFormTemplate())).subscribe();
  }

  changeFormTemplate()
  {
    this.formService.getTotalPassedFormTemplateSize("ALL").subscribe(count => this.totalTemplateFormsSize = count);
    this.formTemplateDataSource.loadFormTemplates('', '',
      this.sort.length > 0 ? this.sort.toArray()[0].direction : 'asc',
      this.sort.length > 0 ? this.sort.toArray()[0].active : 'id',
      this.paginator.length > 0 ? this.paginator.toArray()[0].pageIndex : 0, this.paginator.length > 0 ? this.paginator.toArray()[0].pageSize : 10);
    this.selectedFormTemplateIndex = null;
  }

  onFormTemplateClick(row)
  {
    this.selectedFormTemplateIndex = row.properties.id;
    this.selectedFormTemplateType = row.properties.type;
    this.selectedFormTemplate = row;
    this.selectedFormIndex = undefined;

    this.changeForm();

    // reset the formPaginator after sorting
    this.sort.toArray()[1].sortChange.subscribe(() => this.paginator.toArray()[1].pageIndex = 0);
    merge(this.sort.toArray()[1].sortChange, this.paginator.toArray()[1].page).pipe(tap(() => this.changeForm())).subscribe();
  }

  changeForm()
  {
    // @ts-ignore
    this.formService.getFormListSize(this.selectedFormTemplate.properties.id, this.formType).subscribe(count => this.totalFormsSize = count);
    // @ts-ignore
    this.formDataSource.loadForms(this.selectedFormTemplate.properties.id, this.formType, '',
      this.sort.length > 1 ? this.sort.toArray()[1].direction : 'asc',
      this.sort.length > 1 ? this.sort.toArray()[1].active : 'id',
      this.paginator.length > 1 ? this.paginator.toArray()[1].pageIndex : 0, this.paginator.length > 1 ? this.paginator.toArray()[1].pageSize : 10);
  }

  onFormClick(row)
  {
    this.selectedFormIndex = row.id;
    this.selectedForm = row;

    // this.formValueBitcoin = this.selectedForm.value / 100000000;
    // if (this.bitcoinValue != null && this.bitcoinValue > 0)
    //   this.formValueTooman = this.formValueBitcoin * this.bitcoinValue;
    // else
    //   this.formValueTooman = null;
    // @ts-ignore
    this.formService.getPassedUserFormData(this.selectedForm.id).subscribe(data =>
    {
      this.userFormDataSource.data = data.properties.matches;
    });
  }

  downloadPhotoCal()
  {
    // @ts-ignore
    this.formService.downloadPhotoCal(this.selectedFormTemplate.properties.id, this.selectedFormTemplate.properties.name);
  }
}
