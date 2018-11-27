import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormTemplateHistoryDataSource} from '../../../datasources/formTemplateHistoryDataSource';
import {FormService} from '../../../service/form.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';
import {FormHistoryDataSource} from '../../../datasources/formHistory.datasourse';
import {WinnerDataSource} from '../../../datasources/winner.datasource';
import {UserService} from '../../../service/user.service';
import {WinnerService} from '../../../service/winner.service';

@Component({
  selector: 'app-group-play-winners',
  templateUrl: './group-play-winners.component.html',
  styleUrls: ['./group-play-winners.component.css']
})
export class GroupPlayWinnersComponent implements OnInit
{
  challengeType: string = 'ALL';
  formTemplateDataSource: FormTemplateHistoryDataSource;
  totalTemplateFormsSize: number;

  formTemplateColumns: string[] =
    [
      'index',
      'name',
      'numberOfForms',
      'totalValue'
    ];

  selectedFormTemplateIndex:number;
  selectedFormTemplate:any[];
  selectedWinnerIndex: number;

  winnerDataSource: WinnerDataSource;
  winnersSize: number;

  winnerColumns: string[] =
    [
      'index',
      'username',
      'templateName',
      'formValue',
      'formScore',
      'winnerPlace',
      'prize'
    ];

  userFormDataSource:MatTableDataSource<any>;

  userFormColumns: string[] =
    [
      'index',
      'date',
      'time',
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

  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();


  constructor(private formService: FormService, private winnerService: WinnerService)
  {
    this.formTemplateDataSource = new FormTemplateHistoryDataSource(this.formService);
    this.winnerDataSource = new WinnerDataSource(this.winnerService);
    this.userFormDataSource = new MatTableDataSource();
  }

  ngOnInit()
  {
    // @ts-ignore
    this.formTemplateDataSource.paginator = this.paginator.toArray()[0];
    // @ts-ignore
    this.winnerDataSource.paginator = this.paginator.toArray()[1];

    // @ts-ignore
    this.formTemplateDataSource.sort = this.sort.toArray()[0];
    // @ts-ignore
    this.winnerDataSource.sort = this.sort.toArray()[1];
  }

  ngAfterViewInit()
  {
    this.changeChallengeType();
    // this.sort.toArray()[0].sortChange.subscribe(() => this.paginator.toArray()[0].pageIndex = 0);
    // merge(this.sort.toArray()[0].sortChange, this.paginator.toArray()[0].page).pipe(tap(() => this.changeChallengeType())).subscribe();
  }

  changeChallengeType()
  {
    this.selectedFormTemplateIndex = undefined;
    this.selectedWinnerIndex = undefined;
    this.formService.getTotalPassedFormTemplateSize(this.challengeType).subscribe(count => this.totalTemplateFormsSize = count);
    this.formTemplateDataSource.loadFormTemplates(this.challengeType, '',
      this.sort.length > 0 ? this.sort.toArray()[0].direction : 'asc',
      this.sort.length > 0 ? this.sort.toArray()[0].active : 'id',
      this.paginator.length > 0 ? this.paginator.toArray()[0].pageIndex : 0, this.paginator.length > 0 ? this.paginator.toArray()[0].pageSize : 10);
  }

  onFormTemplateClick(row)
  {
    this.selectedFormTemplateIndex = row.properties.id;
    this.selectedFormTemplate = row;
    this.selectedWinnerIndex = undefined;

    this.changeWinner();

    // reset the formPaginator after sorting
    // this.sort.toArray()[1].sortChange.subscribe(() => this.paginator.toArray()[1].pageIndex = 0);
    // merge(this.sort.toArray()[1].sortChange, this.paginator.toArray()[1].page).pipe(tap(() => this.changeWinner())).subscribe();
  }

  changeWinner()
  {
    // @ts-ignore
    this.winnerService.getWinnerListSize(this.selectedFormTemplate.properties.id).subscribe(count => this.winnersSize = count);
    // @ts-ignore
    this.winnerDataSource.loadWinners(this.selectedFormTemplate.properties.id, '',
      this.sort.length > 1 ? this.sort.toArray()[1].direction : 'asc',
      this.sort.length > 1 ? this.sort.toArray()[1].active : 'id',
      this.paginator.length > 1 ? this.paginator.toArray()[1].pageIndex : 0, this.paginator.length > 1 ? this.paginator.toArray()[1].pageSize : 10);
  }

  onWinnerClick(row)
  {
    this.selectedWinnerIndex = row.id;
    this.formService.getPassedUserFormData(row.formId).subscribe(data =>
    {
      this.userFormDataSource.data = data.properties.matches;
    });
  }

}
