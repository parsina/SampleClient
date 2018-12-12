import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSlideToggle, MatTableDataSource} from '@angular/material';
import {FormService} from '../../../service/form.service';
import {MessageBox} from '../../../utils/messagebox';
import {DataStorage} from '../../../auth/data.storage';
import {UserService} from '../../../service/user.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit
{
  formTemplateList: any[];
  formTemplateId: number;
  dataSource: MatTableDataSource<any>;
  templateName: string;
  templateType: string;
  formValue: number;
  formValueBitcoin: number;
  formValueTooman: number;
  counter: number;
  realForm: boolean = false;

  displayedColumns: string[] =
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
      'awayName'
      // 'awayCountryFlag',
      // 'awayCountry',
    ];

  constructor(private formService: FormService,
              private dialog: MatDialog,
              private userService: UserService,
              private dataStorage: DataStorage,
              private readonly notifier: NotifierService)
  {
    this.dataSource = new MatTableDataSource();
    this.formValue = 1000;
  }

  ngOnInit()
  {
    this.formService.getOpenFormTemplates().subscribe(data =>
    {
      this.formTemplateList = data;
      if (this.formTemplateList.length > 0)
      {
        this.formTemplateId = this.formTemplateList[0].properties.id;
        this.formService.getFormTemplateData(this.formTemplateId).subscribe(data =>
        {
          this.templateName = data.properties.name;
          this.templateType = data.properties.type;
          this.dataSource.data = data.properties.matches;
          this.resetForm();
          const bitcoinValue = this.dataStorage.getBitCoinValueAsNumber();
          if (bitcoinValue != null && bitcoinValue > 0)
            this.formValueTooman = this.formValueBitcoin * bitcoinValue;
          else
            this.formValueTooman = null;
        });
      }
    });
  }

  changeForm()
  {
  }

  changeFormTemplate(id)
  {
    this.formService.getFormTemplateData(id).subscribe(data =>
    {
      this.templateName = data.properties.name;
      this.templateType = data.properties.type;
      this.dataSource.data = data.properties.matches;
      this.resetForm();
    });
  }

  calculateAmounts()
  {
    this.formValue = 1000;
    this.formValueBitcoin = 0.00001;
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

    if (this.counter > 20)
      for (let i = this.counter; i > 20; i--)
      {
        this.formValue = this.formValue * 2;
        this.formValueBitcoin = this.formValueBitcoin * 2;
        const bitcoinValue = this.dataStorage.getBitCoinValueAsNumber();
        if (bitcoinValue != null && bitcoinValue > 0)
          this.formValueTooman = this.formValueBitcoin * bitcoinValue;
        else
          this.formValueTooman = null;
      }
  }

  saveForm()
  {
    if (this.realForm && this.formValue > this.dataStorage.getUserAccountJsonData().balance)
    {
      this.notifier.notify("error", 'موجودی حساب شما کافی نمی باشد. لطفا جهت شرکت در مسابقه، موجودی حساب خود را افزایش دهید.');
      return;
    }

    for (let i = 0; i < this.dataSource.data.length; i++)
    {
      let homeWin = this.dataSource.data[i].properties.homeWin;
      let awayWin = this.dataSource.data[i].properties.awayWin;
      let noWin = this.dataSource.data[i].properties.noWin;
      if (!homeWin && !awayWin && !noWin)
      {
        this.notifier.notify("error", 'کزینه ها به درستی انتخاب نشده اند. لطفا حداقل یک گزینه برای ردیف ' + (i + 1) + ' انتخاب نمایید.');
        return;
      }
    }

    this.formService.createForm(this.dataSource.data, this.formTemplateId, this.realForm).subscribe(responce =>
    {
      const result = JSON.parse(JSON.stringify(responce));
      if (result.success)
      {
        this.notifier.notify("success", 'فرم ' + (result.properties.real ? 'حقیقی' : 'مجازی') + ' با نام ' + result.properties.formName + ' ثبت گردید.');
        this.resetForm();
        if(result.properties.real)
          this.userService.updateUserAccountBalance();
      }
      else
      {
        this.notifier.notify("error", "خطا در ثبت فرم. لطفا مجددا فرم را ثبت نمایید.");
      }
    });
  }

  resetForm()
  {
    this.formValue = 1000;
    this.formValueBitcoin = 0.00001;
    this.counter = 0;
    const bitcoinValue = this.dataStorage.getBitCoinValueAsNumber();
    if (bitcoinValue != null && bitcoinValue > 0)
      this.formValueTooman = this.formValueBitcoin * bitcoinValue;
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
      this.dataSource.data[i].properties.homeWin = Math.random() >= 0.5;
      this.dataSource.data[i].properties.noWin = Math.random() >= 0.5;
      this.dataSource.data[i].properties.awayWin = Math.random() >= 0.5;
      if (this.dataSource.data[i].properties.homeWin == false && this.dataSource.data[i].properties.noWin == false)
        this.dataSource.data[i].properties.awayWin = true;
    }
    this.calculateAmounts();
  }
}


