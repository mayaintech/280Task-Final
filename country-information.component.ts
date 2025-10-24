import { Component } from '@angular/core';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-country-information',
  templateUrl: './country-information.component.html',
  styleUrl: './country-information.component.css'
})
export class CountryInformationComponent {
  countryCode: string = '';
  countryData: any = null;
  errorMessage: string = '';

  constructor(private countryService: CountryService) {}

  getCountryInfo(countryCode: string): void {
    this.countryService.getCountryInfo(countryCode).subscribe(
      (data) => {
        if (data && data[1] && data[1][0]) {
          this.countryData = data[1][0];
          this.errorMessage = '';
        } else {
          this.errorMessage = "No data found for this country code.";
          this.countryData = null;
        }
      },
      (error) => {
        this.errorMessage = "Error fetching country data.";
        this.countryData = null;
      }
    );

}
