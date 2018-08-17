import { BitcointradeService } from "../../service/bitcointrade.service";
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.component.html',
  styleUrls: ['./bitcoin.component.css']
})
export class BitcoinComponent implements OnInit 
{
  displayedBuyersColumns: string[] = ['index', 'price', 'buyButton'];
  displayedSellersColumns: string[] = ['sellButton', 'price', 'index'];
  
  buyersDataSource: MatTableDataSource<any>;
  sellersDataSource: MatTableDataSource<any>;

  constructor(private bitcointradeService: BitcointradeService) 
  {
    this.buyersDataSource = new MatTableDataSource(); 
    this.sellersDataSource = new MatTableDataSource();    
  }

  ngOnInit() 
  {
    this.bitcointradeService.getBitCoinBuyOrdersData().subscribe(data => 
    { 
      this.buyersDataSource.data = data;
    });
    
    this.bitcointradeService.getBitCoinSellOrdersData().subscribe(data => 
    { 
      this.sellersDataSource.data = data;
    });
  }
  
  isDisabled()
  {
    return (sessionStorage.getItem('currentUser') == null || sessionStorage.getItem('currentUser') === null);
  }
  
  isVisible(value:string)
  {
    if(value)
      return true;
    else
      return false;  
  }

}
