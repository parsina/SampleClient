import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormService} from '../../../service/form.service';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';
import {FinalizeFormsDatasourse} from '../../../datasources/finalizeForms.datasourse';
import {DataStorage} from '../../../auth/data.storage';
import {ProgressLoaderComponent} from '../../progress-loader/progress-loader.component';
import {AuthenticationService} from '../../../service/authentication.service';

@Component({
  selector: 'app-group-play',
  templateUrl: './group-play.component.html',
  styleUrls: ['./group-play.component.css']
})
export class GroupPlayComponent implements OnInit, AfterViewInit
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

  formColumns: string[] =
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
      'status',
      'score'
    ];

  formTemplateList: any[];
  dataSource: MatTableDataSource<any>;
  selectedFormTemplateId: number;
  selectedFormTemplateName: string;
  selectedFormTemplateStatus: string;
  selectedFormTemplateType: string;
  finalizeForms: FinalizeFormsDatasourse;
  totalFormsSize: number;
  @Input() source: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectedFormId: number;
  selectedFormValue: number;
  selectedFormStatus: number;
  selectedFormName: string;
  selectedFormUsername: string;
  realForm: boolean;
  formValueBitcoin: number;
  formValueTooman: number;
  formDataSource:MatTableDataSource<any>;
  formType: string = 'All';

  constructor(private formService: FormService,
              private dataStorage: DataStorage,
              private auth:AuthenticationService)
  {
    this.dataSource = new MatTableDataSource();
    this.formDataSource = new MatTableDataSource();
  }

  ngOnInit()
  {
    this.finalizeForms = new FinalizeFormsDatasourse(this.formService);
  }

  ngAfterViewInit()
  {
    // this.auth.showLoader();

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

      this.changeFormType();
    });

    // reset the formTempalatePaginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(tap(() => this.changeFormTemplate(this.formTemplateList[0].properties.id))).subscribe();
  }

  changeFormTemplate(id)
  {
    // const dialogRef = this.loadingDialog.open(ProgressLoaderComponent, {panelClass: 'custom-dialog-container'});
    // dialogRef.disableClose = true;
    this.selectedFormId = undefined;
    this.selectedFormValue = undefined;
    this.selectedFormStatus = undefined;
    this.selectedFormName = undefined;
    this.realForm = undefined;

    this.selectedFormTemplateId = id;
    this.formService.getFormTemplateData(id).subscribe(data =>
    {
      this.selectedFormTemplateName = data.properties.name;
      this.selectedFormTemplateStatus = data.properties.status;
      this.selectedFormTemplateType = data.properties.type;
      this.dataSource.data = data.properties.matches;

      this.changeFormType();

    });
  }

  downloadPhotoCal()
  {
    this.formService.downloadPhotoCal(this.selectedFormTemplateId, this.selectedFormTemplateName);
  }

  onRowClicked(row)
  {
    // const dialogRef = this.loadingDialog.open(ProgressLoaderComponent, {panelClass: 'custom-dialog-container'});
    // dialogRef.disableClose = true;

    this.selectedFormId = row.id;
    this.selectedFormValue = row.value;
    this.selectedFormStatus = row.status;
    this.selectedFormName = row.name;
    this.selectedFormUsername = row.username;
    this.realForm = row.real;

    // @ts-ignore
    this.formValueBitcoin = this.selectedFormValue / 100000000;
    const bitcoinValue = this.dataStorage.getBitCoinValueAsNumber();
    if (bitcoinValue != null && bitcoinValue > 0)
      this.formValueTooman = this.formValueBitcoin * bitcoinValue;
    else
      this.formValueTooman = null;
    // @ts-ignore
    this.formService.getUserFormData(this.selectedFormId).subscribe(data =>
    {
      this.formDataSource.data = data.properties.matches;
      // this.loadingDialog.closeAll();
    });
  }

  changeFormType()
  {
    this.formService.getActiveFinalizeTotalFormsSize(this.selectedFormTemplateId, this.formType).subscribe(count =>
      this.totalFormsSize = count
    );
    this.finalizeForms.loadFinalizedForms(this.selectedFormTemplateId, this.formType,'',
      this.sort ? this.sort.direction : 'asc', this.sort ? this.sort.active : 'createdDate',
                  this.paginator.pageIndex, this.paginator.pageSize);
  }

  rowStyle(val, index): string
  {
    if( val.status != 'FT' )
      return index%2 == 0 ? 'row1' : 'row2';
    else
      return val.score ? 'winRow' : 'looseRow';
  }
}
