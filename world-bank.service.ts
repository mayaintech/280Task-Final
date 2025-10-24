import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorldBankService {

  constructor(private http: HttpClient) {}

  // Get general country info (name, capital, region, income level)
  getCountryInfo(countryCode: string): Observable<any> {
    return this.http.get(`https://api.worldbank.org/v2/country/${countryCode}?format=json`);
  }

  // Get pop
  getPopulation(countryCode: string): Observable<any> {
    return this.http.get(`https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?format=json`);
  }

  // Get GDP 
  getGDP(countryCode: string): Observable<any> {
    return this.http.get(`https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json`);
  }
}
