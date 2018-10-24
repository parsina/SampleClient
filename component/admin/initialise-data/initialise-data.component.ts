import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-initialise-data',
  templateUrl: './initialise-data.component.html',
  styleUrls: ['./initialise-data.component.css']
})
export class InitialiseDataComponent implements OnInit
{
  countryColumns: string[] = ['index', 'farsiName', 'name'];
  countrySource: MatTableDataSource<any>;

  leagueColumns: string[] = ['index', 'farsiName', 'name'];
  leagueSource: MatTableDataSource<any>;

  teamColumns: string[] = ['index', 'farsiName', 'name'];
  teamSource: MatTableDataSource<any>;

  constructor(private userService:UserService)
  {
    this.countrySource = new MatTableDataSource();
    this.leagueSource = new MatTableDataSource();
    this.teamSource = new MatTableDataSource();
  }

  ngOnInit()
  {
    this.userService.getCountries().subscribe(data =>
    {
      this.countrySource.data = data;
    });

    this.userService.getLeagues().subscribe(data =>
    {
      this.leagueSource.data = data;
    });

    this.userService.getTeams().subscribe(data =>
    {
      this.teamSource.data = data;
    });
  }

  setCountryFarsiName(key, value)
  {
    this.userService.saveCountry(key, value).subscribe(data => {});
  }

  setLeagueFarsiName(key, value)
  {
    this.userService.saveLeague(key, value).subscribe(data => {});
  }

  setTeamFarsiName(key, value)
  {
    this.userService.saveTeam(key, value).subscribe(data => {});
  }
}
