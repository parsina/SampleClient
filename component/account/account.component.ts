import {Component, OnInit} from '@angular/core';
import {FormService} from '../../service/form.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {MessageBox} from '../../utils/messagebox';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})


export class AccountComponent implements OnInit
{
  constructor() { }
  ngOnInit() {
  }
}
