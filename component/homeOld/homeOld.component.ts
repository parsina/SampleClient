import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {FormService} from '../../service/form.service';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './homeOld.component.html',
  styleUrls: ['./homeOld.component.css']
})
export class HomeOldComponent implements OnInit
{
  source: any;

  constructor(private formService: FormService,
              private auth: AuthenticationService)
  {
    this.source = this.formService.updateFromTemplate();
  }

  ngOnInit()
  {
  }

  isUserLoggedIn()
  {
    return this.auth.isUserLoggedIn();
  }
}