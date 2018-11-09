import {Component, OnInit, ViewChild} from '@angular/core';
import {MyFormsComponent} from './my-forms/my-forms.component';
import {MatTabChangeEvent} from '@angular/material';
import {CreateFormComponent} from './create-form/create-form.component';
import {TransactionComponent} from './transaction/transaction.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})


export class AccountComponent implements OnInit
{
  @ViewChild(CreateFormComponent) createForm: CreateFormComponent;
  @ViewChild(MyFormsComponent) myForm: MyFormsComponent;
  @ViewChild(TransactionComponent) transactions: TransactionComponent;

  constructor()
  {
  }

  ngOnInit()
  {
  }

  updateTap(event: MatTabChangeEvent)
  {
    this.createForm.resetForm();
    this.myForm.changeFormType();
    this.transactions.loadTransactions();
    this.transactions.resetData();
  }
}
