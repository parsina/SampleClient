import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitcointradeService {

  constructor(private http: HttpClient) { }
  
  getBitCoinBuyOrdersData(): Observable<any> 
  {
    return this.http.get('//localhost:8090/bitCoinBuyOrders');
  }
  
  getBitCoinSellOrdersData(): Observable<any> 
  {
    return this.http.get('//localhost:8090/bitCoinSellOrders');
  }
}
