import { Component, OnInit } from '@angular/core';
import { WorldBankService } from './world-bank.service'; 



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  countryInfo: any = {};  
  population: number = 0;  
  gdp: number = 0;

  constructor(private worldBankService: WorldBankService) {}

  ngOnInit() {
    // Get country info (name, capital, region, income level)
    this.worldBankService.getCountryInfo('TCD').subscribe(data => {
      this.countryInfo = {
        countryName: data[1].name,  
        capital: data[1].capitalCity,  
        region: data[1].region.value,  
        incomeLevel: data[1].incomeLevel.value,  
      };
    });

    // Get pop
    this.worldBankService.getPopulation('TCD').subscribe(data => {
      this.population = data[1][0].value;  
    });

    // Get GDP 
    this.worldBankService.getGDP('TCD').subscribe(data => {
      this.gdp = data[1][0].value;  
    });
  }
}
