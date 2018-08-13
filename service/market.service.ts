import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http: HttpClient) { }
  
  getMarketData(): Observable<any> {
    return this.http.get('//localhost:8090/marketData');
  }
}
