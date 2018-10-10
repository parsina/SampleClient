import {Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {FormService} from '../../../service/form.service';
import {MessageBox} from '../../../utils/messagebox';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit
{
  formList: any[];
  formTemplateId: number;
  dataSource: MatTableDataSource<any>;
  formName: string;
  formValue: number;
  formValueBitcoin: number;
  formValueTooman: number;
  bitcoinValue: number;
  counter: number;

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
      'homeWin',
      'noWin',
      'awayWin',
      'awayLogo',
      'awayName'
      // 'awayCountryFlag',
      // 'awayCountry',
    ];

  constructor(private formService: FormService, private dialog: MatDialog)
  {
    this.dataSource = new MatTableDataSource();
    this.formValue = 100;
  }

  ngOnInit()
  {
    this.formService.getOpenFormTemplates().subscribe(data =>
    {
      this.formList = data;
      if (this.formList.length > 0)
      {
        this.formTemplateId = this.formList[0].properties.id;
        this.formService.getFormTemplateData(this.formTemplateId).subscribe(data =>
        {
          this.formName = data.properties.name;
          this.dataSource.data = data.properties.matches;
          this.resetForm();
        });
      }
    });
  }

  changeForm()
  {
    this.formService.getFormTemplateData(this.formTemplateId).subscribe(data =>
    {
      this.formName = data.properties.name;
      this.dataSource.data = data.properties.matches;
      this.resetForm();
    });
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

  calculateAmounts()
  {
    this.formValue = 100;
    this.formValueBitcoin = 0.000001;
    this.counter = 0;
    for (let i = 0; i < this.dataSource.data.length; i++)
    {
      let homeWin = this.dataSource.data[i].properties.homeWin;
      let awayWin = this.dataSource.data[i].properties.awayWin;
      let noWin = this.dataSource.data[i].properties.noWin;

      if (homeWin)
        this.counter++;
      if (awayWin)
        this.counter++;
      if (noWin)
        this.counter++;
    }

    if (this.counter > 18)
      for (let i = this.counter; i > 18; i--)
      {
        this.formValue = this.formValue * 2;
        this.formValueBitcoin = this.formValueBitcoin * 2;
        if (this.bitcoinValue != null && this.bitcoinValue > 0)
          this.formValueTooman = this.formValueBitcoin * this.bitcoinValue;
        else
          this.formValueTooman = null;
      }
  }

  saveForm()
  {
    for (let i = 0; i < this.dataSource.data.length; i++)
    {
      let homeWin = this.dataSource.data[i].properties.homeWin;
      let awayWin = this.dataSource.data[i].properties.awayWin;
      let noWin = this.dataSource.data[i].properties.noWin;
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

    this.formService.createForm(this.dataSource.data, this.formTemplateId).subscribe(responce =>
    {
      let title = 'ثبت فرم';
      let message;
      let info = 'جهت مشاهده همه فرم های خود، به بخش فرم های من مراجعه نمایید.';

      const result = JSON.parse(JSON.stringify(responce));
      if (result.success)
      {
        this.resetForm();
        message = 'فرم شما با موفقیت ثبت گردید.';
        MessageBox.show(this.dialog, message, title, info, 0, false, 1, '30%')
          .subscribe(results =>
          {
          });
      }
      else
      {
        message = 'خطا در ثبت فرم';
        MessageBox.show(this.dialog, message, title, info, 0, false, 1, '30%')
          .subscribe(results =>
          {
          });
      }
    });
  }

  resetForm()
  {
    this.formValue = 100;
    this.formValueBitcoin = 0.000001;
    this.counter = 0;
    if (this.bitcoinValue != null && this.bitcoinValue > 0)
      this.formValueTooman = this.formValueBitcoin * this.bitcoinValue;
    else
      this.formValueTooman = null;
    for (let i = 0; i < this.dataSource.data.length; i++)
    {
      this.dataSource.data[i].properties.homeWin = false;
      this.dataSource.data[i].properties.noWin = false;
      this.dataSource.data[i].properties.awayWin = false;
    }
  }

  randomForm()
  {
    this.resetForm();
    for (let i = 0; i < this.dataSource.data.length; i++)
    {
      this.dataSource.data[i].properties.homeWin =  Math.random() >= 0.5;
      this.dataSource.data[i].properties.noWin = Math.random() >= 0.5;
      this.dataSource.data[i].properties.awayWin = Math.random() >= 0.5;
      if( this.dataSource.data[i].properties.homeWin == false && this.dataSource.data[i].properties.noWin == false)
        this.dataSource.data[i].properties.awayWin = true;
    }
    this.calculateAmounts();
  }
}


