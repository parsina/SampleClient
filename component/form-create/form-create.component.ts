import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {FormService} from '../../service/form.service';
import {MessageBox} from '../../utils/messagebox';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit
{
  displayedColumns: string[] = ['checkbox', 'date', 'time', 'country', 'league', 'home', 'away', 'location'];
  dataSource: MatTableDataSource<any>;
  counter: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formService: FormService, private dialog: MatDialog)
  {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit()
  {
    this.formService.getMatchesData().subscribe(data =>
    {
      this.dataSource.data = data;
    });

    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string)
  {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator)
    // {
    //   this.dataSource.paginator.firstPage();
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

    if (this.counter > 9)
      alert('Counter : ' + this.counter);
  }

  createForm()
  {
    if (this.counter < 10)
      return;
    let ids = [];
    for (let i = 0; i < this.dataSource.data.length; i++)
      if (this.dataSource.data[i].properties.checked)
        ids.push(this.dataSource.data[i].properties.id);

    if (ids.length == 10)
    {
      let title = 'ثبت فرم';
      let message;
      let info = 'فرم ثبت شد.';

      MessageBox.show(this.dialog, message, title, info, 0, false, 1, '30%')
        .subscribe(results =>
        {
          this.formService.createForm(ids)
            .subscribe(
              result =>
              {
              },
              errors =>
              {
                console.log('Form Creation Error !!!!');
              });
        });
    }

    this.formService.getMatchesData().subscribe(data =>
    {
      this.dataSource.data = data;
    });
  }

  loadMatches()
  {
    let title = 'بارگزاری';
    let message;
    let info = 'بارگزاری شد.';
    this.formService.loadMatches().subscribe(data =>
    {
      this.dataSource.data = data;
    });

    MessageBox.show(this.dialog, message, title, info, 0, false, 1, '30%');
  }
}
