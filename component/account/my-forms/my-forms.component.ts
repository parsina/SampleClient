import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormService} from '../../../service/form.service';
import {MatPaginator, MatSort, MatDialog, MatTableDataSource} from '@angular/material';
import {UserFormDataSource} from '../../../datasources/userform.datasource';
import {catchError, finalize, tap} from 'rxjs/operators';
import {merge, of} from 'rxjs';
import {MessageBox} from '../../../utils/messagebox';

@Component({
  selector: 'app-my-forms',
  templateUrl: './my-forms.component.html',
  styleUrls: ['./my-forms.component.css']
})
export class MyFormsComponent implements OnInit, AfterViewInit
{
  formType: string = 'ACTIVE';
  formList: UserFormDataSource;
  totalFormsSize: number;
  selectedRowIndex: number;
  formDataSource:MatTableDataSource<any>;
  selectedForm: any[];
  formValueBitcoin: number;
  formValueTooman: number;
  bitcoinValue: number;
  counter: number;

  formsColumns: string[] =
    [
      'index',
      'templateName',
      'name',
      'createdDate',
      'value',
      'score',
      'status'
    ];

  formColumns: string[] =
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
      'awayName'
      // 'awayCountryFlag',
      // 'awayCountry',
    ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formService: FormService, private dialog: MatDialog)
  {
    this.formDataSource = new MatTableDataSource();
  }

  ngOnInit()
  {
    this.formList = new UserFormDataSource(this.formService);
    this.changeFormType();
  }

  ngAfterViewInit()
  {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(tap(() => this.changeFormType())).subscribe();
  }

  changeFormType()
  {
    this.formService.getUserTotalFormsSize(this.formType).subscribe(count => this.totalFormsSize = count);
    this.formList.loadUserForms(this.formType, '', this.sort ? this.sort.direction : 'asc', this.sort ? this.sort.active : 'id', this.paginator.pageIndex, this.paginator.pageSize);
    this.selectedRowIndex = null;
  }

  onRowClicked(row)
  {
    this.selectedRowIndex = row.id;
    this.selectedForm = row;
    // @ts-ignore
    this.formValueBitcoin = this.selectedForm.value / 100000000;
    if (this.bitcoinValue != null && this.bitcoinValue > 0)
      this.formValueTooman = this.formValueBitcoin * this.bitcoinValue;
    else
      this.formValueTooman = null;
    // @ts-ignore
    this.formService.getUserFormData(this.selectedForm.id).subscribe(data =>
    {
      this.formDataSource.data = data.properties.matches;
    });
  }

  calculateAmounts()
  {
    // @ts-ignore
    this.selectedForm.value = 100;
    this.formValueBitcoin = 0.000001;
    this.counter = 0;
    for (let i = 0; i < this.formDataSource.data.length; i++)
    {
      let homeWin = this.formDataSource.data[i].properties.homeWin;
      let awayWin = this.formDataSource.data[i].properties.awayWin;
      let noWin = this.formDataSource.data[i].properties.noWin;

      if (homeWin)
        this.counter++;
      if (awayWin)
        this.counter++;
      if (noWin)
        this.counter++;
    }

    if (this.counter > 10)
      for (let i = this.counter; i > 10; i--)
      {
        // @ts-ignore
        this.selectedForm.value = this.selectedForm.value * 2;
        this.formValueBitcoin = this.formValueBitcoin * 2;
        if (this.bitcoinValue != null && this.bitcoinValue > 0)
          this.formValueTooman = this.formValueBitcoin * this.bitcoinValue;
        else
          this.formValueTooman = null;
      }
  }

  setBitcoinValue(value: string)
  {
    let str: string = '';
    for (let i = 0; i < value.split(",").length; i++)
      str += value.split(',')[i];
    this.bitcoinValue = +str;
    if (this.bitcoinValue != null && this.bitcoinValue > 0)
      this.formValueTooman = this.formValueBitcoin * this.bitcoinValue;
    else
      this.formValueTooman = null;
  }

  saveForm()
  {
    for (let i = 0; i < this.formDataSource.data.length; i++)
    {
      let homeWin = this.formDataSource.data[i].properties.homeWin;
      let awayWin = this.formDataSource.data[i].properties.awayWin;
      let noWin = this.formDataSource.data[i].properties.noWin;
      if (!homeWin && !awayWin && !noWin)
      {
        let title = 'خطا';
        let message = 'کزینه ها به درستی انتخاب نشده اند.';
        let info = 'لطفا حداقل یک گزینه برای ردیف ' + (i + 1) + ' انتخاب نمایید.';

        MessageBox.show(this.dialog, message, title, info, 0, false, 1, '30%')
          .subscribe(results =>
          {
          });
        return;
      }
    }

    // @ts-ignore
    this.formService.updateForm(this.formDataSource.data, this.selectedForm.id).subscribe(responce =>
    {
      let title = 'ثبت فرم';
      let message;
      let info = '';

      const result = JSON.parse(JSON.stringify(responce));
      if (result.success)
      {
        message = 'فرم شما با موفقیت ویرایش گردید.';
        MessageBox.show(this.dialog, message, title, info, 0, false, 1, '30%')
          .subscribe(results =>
          {
          });
      }
      else
      {
        message = 'خطا در ویرایش فرم';
        MessageBox.show(this.dialog, message, title, info, 0, false, 1, '30%')
          .subscribe(results =>
          {
          });
      }
    });
  }

  resetForm()
  {
    // @ts-ignore
    this.formValue = 100;
    this.formValueBitcoin = 0.000001;
    this.counter = 0;
    if (this.bitcoinValue != null && this.bitcoinValue > 0)
      this.formValueTooman = this.formValueBitcoin * this.bitcoinValue;
    else
      this.formValueTooman = null;
    for (let i = 0; i < this.formDataSource.data.length; i++)
    {
      this.formDataSource.data[i].properties.homeWin = false;
      this.formDataSource.data[i].properties.noWin = false;
      this.formDataSource.data[i].properties.awayWin = false;
    }
  }
}