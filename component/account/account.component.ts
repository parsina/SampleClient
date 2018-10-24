import {Component, OnInit, ViewChild} from '@angular/core';
import {MyFormsComponent} from './my-forms/my-forms.component';
import {MatTabChangeEvent} from '@angular/material';
import {CreateFormComponent} from './create-form/create-form.component';
import {UserService} from '../../service/user.service';
import {DataStorage} from '../../auth/data.storage';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})


export class AccountComponent implements OnInit
{
  @ViewChild(CreateFormComponent) createForm: CreateFormComponent;
  @ViewChild(MyFormsComponent) myForm: MyFormsComponent;

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
  }
}
