import { Component, OnInit } from '@angular/core';
import { WorldBankService } from '../world-bank.service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {
  countryInfo: any = {};  
  population: number = 0;  
  gdp: number = 0;
  hoveredCountryId: string | null = null;

  constructor(private worldBankService: WorldBankService) {}

  ngOnInit() {
    this.fetchCountryData('TCD'); 
  }

  fetchCountryData(code: string) {
    this.worldBankService.getCountryInfo(code).subscribe((data: any) => {
      console.log('Country Info Data:', data);
      if (data && data[1]) {
        this.countryInfo = {
          countryName: data[1][0].name,  
          capital: data[1][0].capitalCity,  
          region: data[1][0].region.value,  
          incomeLevel: data[1][0].incomeLevel.value,  
        };
      }
    });

    this.worldBankService.getPopulation(code).subscribe((data: any) => {
      if (data && data[1] && data[1][0]) {
        this.population = data[1][0].value;  
      }
    }); 

    this.worldBankService.getGDP(code).subscribe((data: any) => {
      if (data && data[1] && data[1][0]) {
        this.gdp = data[1][0].value;  
      }
    }); 
  }

  onCountryHover(event: any) {
    const countryCode = (event.target as Element).id.toUpperCase();
    this.hoveredCountryId = countryCode;
    this.fetchCountryData(countryCode);
    this.changeCountryColor(event.target, true);
  }

  onCountryLeave(event: any) {
    this.changeCountryColor(event.target, false);
    this.hoveredCountryId = null;
   
  }

  changeCountryColor(element: Element, isHovered: boolean) {
    if (isHovered) {
      element.classList.add('highlighted');
    }
    else {
      element.classList.remove('highlighted');
    }
  }
}
