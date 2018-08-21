import { MarketService } from '../../service/market.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './crypto-home.component.html',
  styleUrls: ['./crypto-home.component.css']
})
export class CryptoHomeComponent implements OnInit
{
  displayedColumns: string[] = ['symbol', 'buyButton', 'askPrice', 'bidPrice', 'sellButton', 'marketValue', 'marketVolume', 'changePercent'];
  dataSource: MatTableDataSource<any>;
  
  constructor(private marketService: MarketService) 
  { 
    this.dataSource = new MatTableDataSource(); 
  }  

  ngOnInit() 
  {     
    this.marketService.getMarketData().subscribe(data => 
    { 
      this.dataSource.data = data;
    });
    
  }
    
  applyFilter(filterValue: string) 
  { 
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) 
    {
      this.dataSource.paginator.firstPage();
    }
  }
  
  isDisabled()
  {    
    return (sessionStorage.getItem('currentUser') == null || sessionStorage.getItem('currentUser') === null);
  }
}
