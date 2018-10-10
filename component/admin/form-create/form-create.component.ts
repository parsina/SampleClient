import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {FormService} from '../../../service/form.service';
import {MessageBox} from '../../../utils/messagebox';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit
{
  displayedColumns: string[] = ['index', 'checkbox', 'date', 'time', 'league', 'homeCountry', 'homeLogo', 'homeTeam', 'awayTeam', 'awayLogo', 'awayCountry'];
  dataSource: MatTableDataSource<any>;
  counter: number = 0;
  formTemplateType: string = 'GOLD';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formService: FormService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef)
  {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit()
  {
    this.formService.getFixtureData().subscribe(data =>
    {
      this.dataSource.data = data;
    });

    // @ts-ignore
    this.dataSource.formTempalatePaginator = this.paginator;
  }

  applyFilter(filterValue: string)
  {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.formTempalatePaginator)
    // {
    //   this.dataSource.formTempalatePaginator.firstPage();
    // }
  }

  selectRow(element: any)
  {
    let id = element.properties.id;
    let checked = !element.properties.checked;

    if (checked)
      this.counter++;
    else
      this.counter--;

    for (let i = 0; i < this.dataSource.data.length; i++)
      if (this.dataSource.data[i].properties.id === id)
        this.dataSource.data[i].properties.checked = checked;

    if (this.counter > 14)
      alert('Counter : ' + this.counter);
  }

  createForm()
  {
    if (this.counter < 15)
      return;
    let ids = [];
    for (let i = 0; i < this.dataSource.data.length; i++)
      if (this.dataSource.data[i].properties.checked)
        ids.push(this.dataSource.data[i].properties.id);

    if (ids.length == 15)
    {
      this.formService.createFormTemplate(ids, this.formTemplateType)
        .subscribe(
          result =>
          {
            let title = 'ثبت فرم';
            let message;
            let info = 'فرم ثبت شد.';

            MessageBox.show(this.dialog, message, title, info, 0, false, 1, '30%')
              .subscribe(messageResult =>
              {
                this.dataSource.data = result;
                this.counter = 0;
              });
          },
          errors =>
          {
            console.log('Form Creation Error !!!!');
          });



    }

    this.formService.getFixtureData().subscribe(data =>
    {
      this.dataSource.data = data;
      this.changeDetectorRefs.detectChanges();
    });
  }

  loadFixtures()
  {
    this.formService.loadFixtures().subscribe();
  }
}
